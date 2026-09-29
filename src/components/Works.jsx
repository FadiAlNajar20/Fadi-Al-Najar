import { LuArrowUpRight, LuBriefcase } from "react-icons/lu";

import { projects } from "../constants";
import { keepTogether, useI18n } from "../i18n";
import { styles } from "../styles";
import { screenshot } from "../utils/images";
import CheckList from "./CheckList";
import { BrowserFrame, PhoneFrame } from "./DeviceFrames";
import SectionHeading from "./SectionHeading";

const ProjectMedia = ({ media, alt, desktopSizes }) => {
  const desktop = screenshot(media.desktop);
  const mobile = screenshot(media.mobile);

  return (
    <div className="relative pb-5 pe-5 sm:pb-8 sm:pe-8">
      <BrowserFrame url={media.frameUrl}>
        <img
          src={desktop.src}
          srcSet={desktop.srcSet}
          sizes={desktopSizes}
          width="1600"
          height="1000"
          alt={alt.desktop}
          loading="lazy"
          decoding="async"
          className="media-shot h-full w-full object-cover object-top"
        />
      </BrowserFrame>
      <PhoneFrame className="absolute bottom-0 end-0 w-[23%] min-w-[72px] max-w-[170px]">
        <img
          src={mobile.src}
          srcSet={mobile.srcSet}
          sizes="(min-width: 1024px) 160px, 22vw"
          width="480"
          height="1039"
          alt={alt.mobile}
          loading="lazy"
          decoding="async"
          className="media-shot h-full w-full object-cover object-top"
        />
      </PhoneFrame>
    </div>
  );
};

const VisitLink = ({ href, name }) => {
  const { t } = useI18n();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm min-h-[44px] px-5">
      {t.work.visit}
      <LuArrowUpRight className={`nudge nudge-out h-4 w-4 ${styles.flip}`} aria-hidden="true" />
      <span className="sr-only">
        : {name} {t.common.newTab}
      </span>
    </a>
  );
};

const projectMeta = (copy) => [copy.type, copy.sector, copy.location].join(" · ");

const FeaturedProject = ({ project }) => {
  const { t, locale } = useI18n();
  const copy = t.projects[project.id];

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={`project ${styles.card} overflow-hidden rounded-3xl`}
      data-reveal
    >
      <div className="relative isolate border-b border-line bg-surface-tint p-5 sm:p-10 lg:px-16 lg:pt-14">
        <div
          aria-hidden="true"
          className="dot-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_70%_at_50%_40%,black,transparent)]"
        />
        {/* The screenshots settle just after the card itself. */}
        <div className="mx-auto max-w-4xl" data-reveal="media">
          <ProjectMedia
            media={project.media[locale]}
            alt={copy.imageAlt}
            desktopSizes="(min-width: 1152px) 860px, 84vw"
          />
        </div>
      </div>

      <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-12">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-brand">{t.work.featured}</span>
            <span className="badge badge-neutral">{copy.badge}</span>
          </div>
          <p className={`mt-5 ${styles.meta}`}>{projectMeta(copy)}</p>
          <h3 id={`${project.id}-title`} className="heading-3 mt-2 sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-fg-body sm:text-[1.0625rem]">{copy.summary}</p>

          <dl className="mt-7 grid gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-3">
            {Object.entries(t.work.detailLabels).map(([key, label]) => (
              <div key={key}>
                <dt className="text-sm text-fg-muted">{label}</dt>
                <dd className="mt-1 font-medium text-fg">{copy.details[key]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col">
          <h4 className="text-base font-semibold text-fg">{t.work.highlightsTitle}</h4>
          <CheckList items={copy.highlights} className={`mt-4 ${styles.list}`} />
          <div className="mt-auto pt-8">
            <VisitLink href={project.url[locale]} name={project.name} />
          </div>
        </div>
      </div>
    </article>
  );
};

const ProjectCard = ({ project }) => {
  const { t, locale } = useI18n();
  const copy = t.projects[project.id];

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className={`project ${styles.card} flex flex-col overflow-hidden`}
      data-reveal
    >
      <div className="border-b border-line bg-surface-muted p-5 sm:p-7">
        <ProjectMedia
          media={project.media[locale]}
          alt={copy.imageAlt}
          desktopSizes="(min-width: 1152px) 470px, (min-width: 1024px) 40vw, 84vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className={styles.meta}>{projectMeta(copy)}</p>
        <h3 id={`${project.id}-title`} className="heading-3 mt-2">
          {project.name}
        </h3>
        <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-surface-muted px-3.5 py-2.5 text-sm font-medium leading-relaxed text-fg-body ring-1 ring-inset ring-line">
          <span className="flex h-[1lh] shrink-0 items-center">
            <LuBriefcase className="h-4 w-4 text-accent" aria-hidden="true" />
          </span>
          <span>{keepTogether(copy.context)}</span>
        </p>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-body sm:text-base">{copy.summary}</p>
        <CheckList items={copy.highlights} className={`mt-6 ${styles.list}`} />
        <div className="mt-auto pt-8">
          <VisitLink href={project.url[locale]} name={project.name} />
        </div>
      </div>
    </article>
  );
};

const Works = () => {
  const { t } = useI18n();
  const [featured, ...others] = projects;

  return (
    <section id="work" aria-labelledby="work-title" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading id="work-title" eyebrow={t.work.eyebrow} title={t.work.title} description={t.work.description} />

        <div className={`${styles.sectionBody} space-y-8`}>
          <FeaturedProject project={featured} />
          <div className="grid gap-8 lg:grid-cols-2">
            {others.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
