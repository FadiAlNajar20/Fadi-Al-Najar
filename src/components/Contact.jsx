import { FaWhatsapp } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

import { contact } from "../constants";
import useWhatsappLink from "../hooks/useWhatsappLink";
import { useI18n } from "../i18n";
import { styles } from "../styles";

// Final call to action: a soft coral panel with the invitation on one side and a white action card on
// the other (stacked on smaller screens). WhatsApp first, email second; the number and address are
// also shown as plain text so they can be copied.
const Contact = ({ projectType }) => {
  const { t } = useI18n();
  const whatsappHref = useWhatsappLink(projectType);

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 pt-4 sm:pb-24 lg:pb-28">
      <div className={styles.container}>
        <div
          className="relative isolate grid gap-10 overflow-hidden rounded-3xl border border-brand/20 bg-surface-tint px-6 py-12 shadow-card sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-14 lg:py-16"
          data-reveal="panel"
        >
          {/* Decoration: a thin coral line along the top, faint rings in the far corner, a dotted patch
              near the start. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
            <span className="absolute -end-24 -top-28 hidden h-80 w-80 rounded-full border border-brand/15 lg:block" />
            <span className="absolute -end-10 -top-14 hidden h-44 w-44 rounded-full border border-brand/15 lg:block" />
            <span className="dot-grid absolute -bottom-8 -start-8 h-40 w-56 opacity-50 [mask-image:radial-gradient(closest-side,black,transparent)]" />
          </div>

          {/* The panel enters first, then the invitation and the action card in turn. */}
          <div data-reveal>
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 id="contact-title" className="heading-2 heading-cta mt-5 max-w-xl">
              {t.contact.title}
            </h2>
            <p className="text-lead mt-5 max-w-lg">{t.contact.lead}</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-float sm:p-7" data-reveal>
            <div className="flex flex-col gap-3">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg w-full">
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                {t.contact.whatsappCta}
                <span className="sr-only"> {t.common.newTab}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="btn btn-secondary btn-lg w-full">
                <LuMail className="h-5 w-5" aria-hidden="true" />
                {t.contact.emailCta}
              </a>
            </div>

            <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm font-medium text-fg-secondary">
              <li className="flex items-center gap-2.5">
                <FaWhatsapp className="h-4 w-4 shrink-0 text-whatsapp" aria-hidden="true" />
                <span dir="ltr">{contact.whatsappDisplay}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <LuMail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="[overflow-wrap:anywhere]">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
