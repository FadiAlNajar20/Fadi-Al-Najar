import { useI18n } from "../i18n";
import { locales, localeStorageKey } from "../i18n/config";
import { loadMessages } from "../i18n/messages";

// Each language also has its own pre-rendered page ("/" and "/en/"), so the switch is a real link that
// works without JavaScript and for search engines. With JavaScript, a plain click switches the language
// in place instead (no page load; see useLocaleState). The choice is remembered so "/" can reopen the
// chosen language on a later visit.
const LanguageSwitcher = () => {
  const { locale, t, setLocale } = useI18n();

  const handleClick = (event, code) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      localStorage.setItem(localeStorageKey, code);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); switching still works.
    }
    event.preventDefault();
    setLocale(code);
  };

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex h-10 shrink-0 items-center gap-0.5 rounded-lg border border-line bg-white p-[3px] text-sm font-semibold"
    >
      {Object.values(locales).map(({ code, path, label }) =>
        code === locale ? (
          <span
            key={code}
            lang={code}
            aria-current="true"
            className="inline-flex h-full min-w-[2.625rem] items-center justify-center rounded-md bg-surface-muted px-2.5 text-fg ring-1 ring-inset ring-line"
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
            // Starts fetching the other language's text as soon as the visitor heads for the link.
            onPointerEnter={() => loadMessages(code)}
            onFocus={() => loadMessages(code)}
            className="inline-flex h-full min-w-[2.625rem] items-center justify-center rounded-md px-2.5 text-fg-secondary transition-colors hover:bg-surface-muted hover:text-fg"
          >
            {label}
          </a>
        )
      )}
    </div>
  );
};

export default LanguageSwitcher;
