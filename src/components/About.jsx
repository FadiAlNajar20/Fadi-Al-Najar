import { LuListChecks, LuMessagesSquare, LuSlidersHorizontal } from "react-icons/lu";

import portrait320 from "../assets/fadi-320.webp";
import portrait480 from "../assets/fadi-480.webp";
import portrait640 from "../assets/fadi-640.webp";
import { stack } from "../constants";
import { keepTogether, useI18n } from "../i18n";
import { styles } from "../styles";

const pointIcons = {
  "follow-through": LuListChecks,
  communication: LuMessagesSquare,
  tailored: LuSlidersHorizontal,
};

const About = () => {
  const { t } = useI18n();

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className={`${styles.section} overflow-x-clip`}
    >
      {/* The portrait and the text enter from opposite sides (mirrored in Arabic), the text a moment
          later; overflow-x-clip keeps the sideways entrance from widening the page on phones. */}
      <div className={`${styles.container} grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20`}>
        {/* Portrait in a white frame over a soft coral shape and a dotted corner, which shift a little on hover. */}
        <div data-reveal="start" className="portrait relative isolate w-44 self-start sm:w-52 lg:w-full">
          <div aria-hidden="true" className="portrait-shape absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-3 rounded-[1.75rem] bg-brand-soft rtl:-translate-x-3 rtl:-rotate-3 lg:translate-x-5 lg:translate-y-5 rtl:lg:-translate-x-5" />
          <div aria-hidden="true" className="dot-grid absolute -bottom-6 -start-6 -z-20 h-28 w-28 rounded-2xl opacity-70 lg:-bottom-8 lg:-start-8 lg:h-36 lg:w-36" />
          <img
            src={portrait480}
            srcSet={`${portrait320} 320w, ${portrait480} 480w, ${portrait640} 640w`}
            sizes="(min-width: 1024px) 340px, 208px"
            width="640"
            height="640"
            alt={t.about.portraitAlt}
            loading="lazy"
            decoding="async"
            className="relative aspect-square w-full rounded-[1.75rem] border-[6px] border-white bg-white object-cover shadow-frame"
          />
        </div>

        <div>
          <div className="max-w-2xl" data-reveal="end" data-reveal-delay="80">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 id="about-title" className="heading-2 mt-5">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-body sm:text-lg">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{keepTogether(paragraph)}</p>
              ))}
            </div>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.about.points.map((point) => {
              const Icon = pointIcons[point.id];
              return (
                <li key={point.id} className="flex gap-4 rounded-2xl border border-line bg-surface p-5 sm:block" data-reveal>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-fg sm:mt-4">{point.title}</h3>
                    <p className={`mt-1.5 ${styles.support}`}>{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10" data-reveal>
            <h3 className="text-sm font-semibold text-fg">{t.about.stackTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {stack.map((tool) => (
                <li key={tool} className="chip">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
