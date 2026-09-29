import { LuArrowRight, LuBuilding2, LuCode2, LuLayoutTemplate, LuShoppingBag } from "react-icons/lu";

import { serviceIds } from "../constants";
import { useI18n } from "../i18n";
import { styles } from "../styles";
import CheckList from "./CheckList";
import SectionHeading from "./SectionHeading";

const icons = {
  "landing-page": LuLayoutTemplate,
  "business-website": LuBuilding2,
  shopify: LuShoppingBag,
  "web-app": LuCode2,
};

// Icon tile: coral for the main service, neutral for the others.
const ServiceIcon = ({ id, featured = false }) => {
  const Icon = icons[id];
  const tone = featured ? "bg-brand-soft text-accent ring-brand/20" : "bg-surface-soft text-fg ring-line";
  return (
    <span className={`service-icon inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${tone}`}>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
};

const Arrow = () => <LuArrowRight className={`nudge nudge-forward h-4 w-4 ${styles.flip}`} aria-hidden="true" />;

const Services = ({ onSelectProject }) => {
  const { t } = useI18n();
  const [landingId, ...otherIds] = serviceIds;
  const landing = t.services.items[landingId];

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className={`${styles.section} border-t border-line`}
    >
      <div className={styles.container}>
        <SectionHeading
          id="services-title"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />

        {/* On large screens the list sits beside the description, with the button under the description;
            on smaller screens the button follows the list. */}
        <article
          aria-labelledby={`service-${landingId}`}
          className={`lift card-featured ${styles.cardFeatured} ${styles.sectionBody} grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[1fr_auto] lg:gap-x-14 lg:gap-y-8 lg:p-10`}
          data-reveal
        >
          {/* Coral accent along the top edge, fading out in the reading direction. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-brand/50 to-transparent rtl:bg-gradient-to-l"
          />
          <div>
            <div className="flex items-center gap-3">
              <ServiceIcon id={landingId} featured />
              <span className="badge badge-brand">{t.services.featured}</span>
            </div>
            <h3 id={`service-${landingId}`} className="heading-3 mt-6">
              {landing.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-fg-body sm:text-[1.0625rem]">{landing.summary}</p>
            <p className={`mt-4 ${styles.meta}`}>
              <span className="font-semibold text-fg">{t.services.idealFor}</span> {landing.idealFor}
            </p>
          </div>

          <div className="lg:row-span-2">
            <h4 className="text-base font-semibold text-fg">{t.services.included}</h4>
            <CheckList
              items={landing.points}
              className="mt-4 grid gap-x-8 gap-y-3 text-[0.9375rem] leading-relaxed text-fg-body sm:grid-cols-2 sm:text-base"
            />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <a href="#contact" onClick={() => onSelectProject(landingId)} className="btn btn-primary">
              {landing.cta}
              <Arrow />
            </a>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-7 lg:grid-cols-3 lg:gap-7">
          {otherIds.map((id) => {
            const service = t.services.items[id];
            return (
              <article
                key={id}
                aria-labelledby={`service-${id}`}
                className={`lift ${styles.card} flex flex-col p-6 sm:p-8 md:last:col-span-2 lg:last:col-span-1`}
                data-reveal
              >
                <ServiceIcon id={id} />
                <h3 id={`service-${id}`} className="heading-4 mt-6">
                  {service.title}
                </h3>
                <p className={`mt-3 ${styles.support}`}>{service.summary}</p>
                <CheckList items={service.points} className={`mt-6 ${styles.list}`} />
                {/* The action sits on its own line at the foot of every card, whatever the text length. */}
                <div className="mt-auto pt-7">
                  <div className="border-t border-line pt-4">
                    <a href="#contact" onClick={() => onSelectProject(id)} className="text-link min-h-[44px]">
                      {service.cta}
                      <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className={`mt-10 max-w-3xl ${styles.support}`} data-reveal>
          <span className="font-semibold text-fg">{t.services.agencyTitle}</span> {t.services.agencyText}
        </p>
      </div>
    </section>
  );
};

export default Services;
