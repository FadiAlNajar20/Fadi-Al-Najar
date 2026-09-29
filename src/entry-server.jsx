import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "./App";
import { defaultLocale, locales, localeStorageKey } from "./i18n/config";
import { renderHead } from "./i18n/head";
import { loadMessages } from "./i18n/messages";

// Used at build time by scripts/prerender.js to write one static page per language.
export async function render(locale) {
  const messages = await loadMessages(locale);
  return {
    html: renderToString(
      <StrictMode>
        <App locale={locale} messages={messages} />
      </StrictMode>
    ),
    head: renderHead(locale, messages),
  };
}

export { defaultLocale, locales, localeStorageKey };
