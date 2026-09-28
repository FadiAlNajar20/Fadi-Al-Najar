import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "./App";
import ar from "./i18n/ar";
import { defaultLocale, locales, localeStorageKey } from "./i18n/config";
import en from "./i18n/en";
import { renderHead } from "./i18n/head";

const messages = { ar, en };

// Used at build time by scripts/prerender.js to write one static page per language.
export function render(locale) {
  return {
    html: renderToString(
      <StrictMode>
        <App locale={locale} messages={messages[locale]} />
      </StrictMode>
    ),
    head: renderHead(locale, messages[locale]),
  };
}

export { defaultLocale, locales, localeStorageKey };
