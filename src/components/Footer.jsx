import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { LuArrowUp, LuMail } from "react-icons/lu";

import logo from "../assets/logo-96.webp";
import { contact, sectionIds } from "../constants";
import useWhatsappLink from "../hooks/useWhatsappLink";
import { useI18n } from "../i18n";
import { styles } from "../styles";

const Footer = () => {
  const { t } = useI18n();
  const contactLinks = [
    { id: "whatsapp", href: useWhatsappLink(), icon: FaWhatsapp, external: true },
    { id: "email", href: `mailto:${contact.email}`, icon: LuMail },
    { id: "linkedin", href: contact.linkedin, icon: FaLinkedinIn, external: true },
    { id: "github", href: contact.github, icon: FaGithub, external: true },
  ];

  return (
    <footer className="border-t border-white/[0.08]">
      <div className={`${styles.container} grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]`}>
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5 rounded-md">
            <img src={logo} alt="" width="32" height="32" loading="lazy" className="h-8 w-8" />
            <span className="font-semibold text-white">{t.common.name}</span>
          </a>
          <p className={`mt-4 max-w-sm ${styles.support}`}>{t.footer.tagline}</p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="text-sm font-semibold text-white">
            {t.footer.explore}
          </h2>
          <ul className="mt-3 space-y-1">
            {sectionIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-flex min-h-[40px] items-center text-[0.9375rem] text-zinc-400 hover:text-white">
                  {t.nav.links[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">{t.footer.contact}</h2>
          <ul className="mt-3 space-y-1">
            {contactLinks.map(({ id, href, icon: Icon, external }) => (
              <li key={id}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex min-h-[40px] items-center gap-2.5 text-[0.9375rem] text-zinc-400 hover:text-white"
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t.footer.links[id]}
                  {external && <span className="sr-only"> {t.common.newTab}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div
          className={`${styles.container} flex flex-col gap-3 py-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {t.common.name}. {t.footer.rights}
          </p>
          <a href="#top" className="inline-flex min-h-[44px] items-center gap-1.5 self-start hover:text-white sm:self-auto">
            {t.footer.backToTop}
            <LuArrowUp className="nudge nudge-up h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
