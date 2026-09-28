import { FaWhatsapp } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

import { contact } from "../constants";
import useWhatsappLink from "../hooks/useWhatsappLink";
import { useI18n } from "../i18n";
import { styles } from "../styles";

// Final call to action: WhatsApp first, email second. The number and address are also shown as plain
// text so they can be copied.
const Contact = ({ projectType }) => {
  const { t } = useI18n();
  const whatsappHref = useWhatsappLink(projectType);

  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <div className={styles.container}>
        <div
          className={`${styles.card} relative px-6 py-14 text-center before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand/60 before:to-transparent sm:px-12 sm:py-20`}
          data-reveal="panel"
        >
          {/* The panel enters first, then its heading, text, buttons and details in turn. */}
          <div data-reveal>
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 id="contact-title" className="heading-2 heading-cta mx-auto mt-3 max-w-2xl">
              {t.contact.title}
            </h2>
          </div>
          <p className="text-lead mx-auto mt-5 max-w-xl" data-reveal>
            {t.contact.lead}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 xs:flex-row" data-reveal>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
              <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
              {t.contact.whatsappCta}
              <span className="sr-only"> {t.common.newTab}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="btn btn-secondary btn-lg">
              <LuMail className="h-5 w-5" aria-hidden="true" />
              {t.contact.emailCta}
            </a>
          </div>

          <p
            className="mt-6 flex flex-col items-center gap-1 text-sm text-zinc-400 xs:flex-row xs:justify-center xs:gap-3"
            data-reveal
          >
            <span dir="ltr">{contact.whatsappDisplay}</span>
            <span aria-hidden="true" className="hidden xs:inline">
              ·
            </span>
            <span className="[overflow-wrap:anywhere]">{contact.email}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
