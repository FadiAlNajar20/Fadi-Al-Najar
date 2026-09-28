import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App";
import { localeFromPath, locales } from "./i18n/config";
import "./index.css";

// Each page only downloads its own language's text.
const loadMessages = {
  ar: () => import("./i18n/ar.js"),
  en: () => import("./i18n/en.js"),
};

const locale = localeFromPath(window.location.pathname);
const container = document.getElementById("root");

loadMessages[locale]().then(({ default: messages }) => {
  const app = (
    <StrictMode>
      <App locale={locale} messages={messages} />
    </StrictMode>
  );

  // Production builds ship pre-rendered HTML for each language (scripts/prerender.js), so hydrate it.
  if (container.firstElementChild) {
    hydrateRoot(container, app);
    return;
  }

  // The dev server renders from scratch and always serves the Arabic template, so match it to the URL.
  document.documentElement.lang = locale;
  document.documentElement.dir = locales[locale].dir;
  document.title = messages.meta.title;
  createRoot(container).render(app);
});
