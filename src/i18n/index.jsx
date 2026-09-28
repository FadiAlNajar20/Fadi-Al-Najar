import { createContext, Fragment, useContext } from "react";

// Provides { locale, dir, t } to every component; `t` is the locale's messages (src/i18n/ar.js or en.js).
const I18nContext = createContext(null);

export const I18nProvider = I18nContext.Provider;

export const useI18n = () => useContext(I18nContext);

// Names that must stay on one line ("E-Safqa" or "Full-Stack" would otherwise break after the hyphen). A
// span is used instead of special characters such as U+2011, which the Latin font doesn't include.
const unbreakable = /(E-Safqa|Elevate Pro|Full-Stack)/;

export const keepTogether = (text) =>
  text.split(unbreakable).map((part, index) =>
    index % 2 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
