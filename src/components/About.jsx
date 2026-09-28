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
      className={`${styles.section} overflow-x-clip border-y border-white/[0.06] bg-white/[0.015]`}
    >
      {/* The portrait and the text enter from opposite sides (mirrored in Arabic), the text a moment
          later; overflow-x-clip keeps the sideways entrance from widening the page on phones. */}
      <div className={`${styles.container} grid gap-10 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16`}>
        <div data-reveal="start">
          <img
            src={portrait480}
            srcSet={`${portrait320} 320w, ${portrait480} 480w, ${portrait640} 640w`}
            sizes="(min-width: 1024px) 300px, 176px"
            width="640"
            height="640"
            alt={t.about.portraitAlt}
            loading="lazy"
            decoding="async"
            className="aspect-square w-40 rounded-2xl bg-white object-cover sm:w-44 lg:w-full"
          />
        </div>

        <div>
          <div className="max-w-2xl" data-reveal="end" data-reveal-delay="80">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 id="about-title" className="heading-2 mt-3">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{keepTogether(paragraph)}</p>
              ))}
            </div>
          </div>

          <ul className="mt-10 grid gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
            {t.about.points.map((point) => {
              const Icon = pointIcons[point.id];
              return (
                <li key={point.id} className="flex gap-4 sm:block" data-reveal>
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand sm:mt-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-white sm:mt-3">{point.title}</h3>
                    <p className={`mt-1.5 ${styles.support}`}>{point.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10" data-reveal>
            <h3 className="text-sm font-semibold text-zinc-200">{t.about.stackTitle}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-sm text-zinc-400"
                >
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
