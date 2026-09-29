import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "./App";
import { localeFromPath } from "./i18n/config";
import { loadMessages } from "./i18n/messages";
import "./index.css";

// The URL decides the first language ("/" Arabic, "/en/" English); after that, switching language
// happens inside the app without loading another page (see src/i18n/useLocaleState.js).
const locale = localeFromPath(window.location.pathname);
const container = document.getElementById("root");

loadMessages(locale).then((messages) => {
  const app = (
    <StrictMode>
      <App locale={locale} messages={messages} />
    </StrictMode>
  );

  // Production builds ship pre-rendered HTML for each language (scripts/prerender.js), so hydrate it.
  // The dev server renders from scratch and always serves the Arabic template; App sets lang, dir and
  // the head tags to match the URL.
  if (container.firstElementChild) hydrateRoot(container, app);
  else createRoot(container).render(app);
});
