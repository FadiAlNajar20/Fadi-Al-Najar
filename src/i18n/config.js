// Locale settings shared by the client, the pre-renderer and the language switcher.
// Arabic is the default and lives at "/"; English lives at "/en/". Each URL is pre-rendered
// to its own static page (see scripts/prerender.js), so both are crawlable.

export const locales = {
  ar: { code: "ar", dir: "rtl", path: "/", label: "عربي", ogLocale: "ar_AR" },
  en: { code: "en", dir: "ltr", path: "/en/", label: "EN", ogLocale: "en_US" },
};

export const defaultLocale = "ar";

// Remembers the visitor's explicit choice, so "/" can send them back to English on a later visit.
export const localeStorageKey = "lang";

export const localeFromPath = (pathname) => (/^\/en(\/|$)/.test(pathname) ? "en" : defaultLocale);
