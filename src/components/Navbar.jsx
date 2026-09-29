import { useEffect, useRef, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import logo from "../assets/logo-96.webp";
import { sectionIds } from "../constants";
import { useI18n } from "../i18n";
import { styles } from "../styles";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape (returning focus to its button), on a tap outside the header,
  // or when the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return undefined;
    const desktop = window.matchMedia("(min-width: 768px)");
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setOpen(false);
    };
    const onResize = (event) => event.matches && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <header
      ref={headerRef}
      className={`nav-in fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 border-b-2 border-b-red-100 ${
        solid
          ? "border-line bg-white/90 shadow-[0_6px_24px_-18px_rgb(17_17_17/0.35)] backdrop-blur-md"
          : "border-transparent bg-white/0"
      }`}
    >
      <nav aria-label={t.nav.label}>
        <div
          className={`${styles.container} flex h-16 items-center justify-between gap-4 lg:gap-6`}
        >
          <a
            href="#top"
            onClick={close}
            className="flex min-w-0 items-center gap-2.5 rounded-md"
          >
            <img
              src={logo}
              alt=""
              width="32"
              height="32"
              className="h-8 w-8 shrink-0"
            />
            {/* Visually hidden on the narrowest phones to make room for the language switcher. */}
            <span className="sr-only whitespace-nowrap text-[0.95rem] font-bold text-fg min-[360px]:not-sr-only ltr:tracking-tight">
              {t.common.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="nav-link rounded-md px-3 py-2 text-sm font-medium text-fg-body transition-colors hover:text-fg"
                >
                  {t.nav.links[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 lg:gap-3">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="btn btn-primary btn-sm hidden lg:inline-flex"
            >
              {t.nav.cta}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="-me-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-fg hover:bg-fg/[0.06] md:hidden"
            >
              {open ? (
                <LuX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <LuMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Slides down under the bar. When closed it is visibility:hidden, so keyboard and screen readers skip
            it; it becomes visible immediately on open and hides only after the fade-out finishes. */}
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_18px_30px_-24px_rgb(17_17_17/0.3)] transition-[opacity,transform,visibility] duration-[300ms,300ms,0s] ease-[var(--ease-out)] md:hidden ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0 delay-[0s,0s,300ms]"
          }`}
        >
          <ul className={`${styles.container} py-2`}>
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={close}
                  className="flex min-h-[48px] items-center rounded-md text-base font-medium text-fg-body hover:text-fg"
                >
                  {t.nav.links[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className={`${styles.container} pb-5`}>
            <a
              href="#contact"
              onClick={close}
              className="btn btn-primary w-full"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
