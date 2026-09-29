import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { locales, localeFromPath } from "./config";
import { applyHead } from "./head";
import { cacheMessages, loadMessages } from "./messages";

// The section currently being read and how far its top sits from the top of the window, so the
// visitor stays in the same place when the text reflows in the other language.
const readingPosition = () => {
  const line = window.innerHeight * 0.3;
  let current = null;
  for (const section of document.querySelectorAll("main section[id]")) {
    if (section.getBoundingClientRect().top <= line) current = section;
  }
  if (!current || window.scrollY === 0) return null;
  return { id: current.id, offset: current.getBoundingClientRect().top };
};

// useLayoutEffect only exists in the browser; the pre-renderer gets the no-op useEffect instead.
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const hashFor = (position) => (position && position.id !== "top" ? `#${position.id}` : "");

// Active language as app state. The page's URL sets the first language; switching then:
// 1. loads the other language's text (usually already fetched in the background),
// 2. re-renders the app with it inside a cross-fade where supported, without reloading the page,
// 3. sets <html lang/dir> and the head tags, and keeps the visitor on the same section,
// 4. moves the URL to "/" or "/en/" (plus that section's hash) with the History API.
// Back and Forward between the two URLs switch the language the same way.
const useLocaleState = (initialLocale, initialMessages) => {
  const [state, setState] = useState({ locale: initialLocale, messages: initialMessages });
  const localeRef = useRef(initialLocale);
  const positionRef = useRef(null);

  cacheMessages(initialLocale, initialMessages);

  const show = useCallback(async (locale, { push }) => {
    if (locale === localeRef.current) return;
    const messages = await loadMessages(locale);
    localeRef.current = locale;
    positionRef.current = readingPosition();
    if (push) window.history.pushState(null, "", locales[locale].path + hashFor(positionRef.current));

    const update = () => flushSync(() => setState({ locale, messages }));
    const fade = document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fade) document.startViewTransition(update);
    else update();
  }, []);

  const setLocale = useCallback((locale) => show(locale, { push: true }), [show]);

  // Runs before paint, so the new language never shows with the old direction or scroll position.
  useBrowserLayoutEffect(() => {
    const { locale, messages } = state;
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locales[locale].dir;
    applyHead(locale, messages);

    const position = positionRef.current;
    positionRef.current = null;
    const section = position && document.getElementById(position.id);
    if (section) {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - position.offset, behavior: "instant" });
    }
  }, [state]);

  useEffect(() => {
    const onPopState = () => show(localeFromPath(window.location.pathname), { push: false });
    window.addEventListener("popstate", onPopState);

    // Fetch the other language while the visitor is idle, so the first switch is instant.
    const prefetch = () => Object.keys(locales).forEach((code) => loadMessages(code));
    const idle = window.requestIdleCallback ? window.requestIdleCallback(prefetch) : window.setTimeout(prefetch, 2000);

    return () => {
      window.removeEventListener("popstate", onPopState);
      if (window.requestIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [show]);

  return { ...state, setLocale };
};

export default useLocaleState;
