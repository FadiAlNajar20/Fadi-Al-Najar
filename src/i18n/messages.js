// Loads a language's text (src/i18n/ar.json or en.json) in the browser. Each is its own small chunk:
// a page downloads only its own language up front, and the other one is fetched once, when the visitor
// is idle or about to switch, then kept here so switching back and forth never downloads it again.
const loaders = {
  ar: () => import("./ar.json"),
  en: () => import("./en.json"),
};

const cache = {};

export const loadMessages = (locale) => {
  cache[locale] ??= loaders[locale]().then((module) => module.default);
  return cache[locale];
};

// Seeds the cache with a language that is already loaded (the page's own).
export const cacheMessages = (locale, messages) => {
  cache[locale] ??= Promise.resolve(messages);
};
