import { useI18n } from "../i18n";
import { locales, localeStorageKey } from "../i18n/config";

// The section currently being read, so switching language keeps the visitor in the same place.
const currentSectionHash = () => {
  const line = window.innerHeight * 0.3;
  let current = "";
  for (const section of document.querySelectorAll("main section[id]")) {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  }
  return current && current !== "top" ? `#${current}` : "";
};

// Each language is its own pre-rendered page ("/" and "/en/"), so switching is a normal link that also
// works without JavaScript. The choice is remembered so "/" can reopen the chosen language next time.
const LanguageSwitcher = () => {
  const { locale, t } = useI18n();

  const handleClick = (event, code) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      localStorage.setItem(localeStorageKey, code);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the link still works.
    }
    event.preventDefault();
    window.location.assign(locales[code].path + currentSectionHash());
  };

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex h-10 shrink-0 items-center gap-0.5 rounded-lg border border-white/[0.12] p-[3px] text-sm font-semibold"
    >
      {Object.values(locales).map(({ code, path, label }) =>
        code === locale ? (
          <span
            key={code}
            lang={code}
            aria-current="true"
            className="inline-flex h-full min-w-[2.625rem] items-center justify-center rounded-md bg-white/[0.12] px-2.5 text-white"
          >
            {label}
          </span>
        ) : (
          <a
            key={code}
            href={path}
            lang={code}
            hrefLang={code}
            onClick={(event) => handleClick(event, code)}
            className="inline-flex h-full min-w-[2.625rem] items-center justify-center rounded-md px-2.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            {label}
          </a>
        )
      )}
    </div>
  );
};

export default LanguageSwitcher;
