import { useI18n } from "../i18n";
import { styles } from "../styles";
import SectionHeading from "./SectionHeading";

// The four steps as a guided path on a soft full-width band: numbered circles joined by a dashed coral
// line in the reading direction (styles in index.css). The steps form one centred block narrower than
// the container, each step centred in an equal column: stacked on phones, 2x2 on tablets and one row on
// large screens. The last circle is filled, marking where the path ends: the launch.
const Process = () => {
  const { t } = useI18n();
  const last = t.process.steps.length - 1;

  return (
    <section id="process" aria-labelledby="process-title" className={`${styles.section} border-y border-line bg-surface-soft`}>
      <div className={styles.container}>
        <SectionHeading
          id="process-title"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
          center
        />

        <ol className="mx-auto mt-14 grid max-w-sm gap-y-12 sm:mt-16 sm:max-w-2xl sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:mt-20 lg:max-w-5xl lg:grid-cols-4 lg:gap-0">
          {t.process.steps.map((step, index) => (
            // Keyed by position, so switching language updates each step in place and keeps its reveal state.
            <li key={index} className="timeline-step flex flex-col items-center text-center lg:px-4" data-reveal>
              <span
                className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold tabular-nums shadow-float ring-8 ring-surface-soft ${
                  index === last ? "bg-brand-fill text-white" : "border border-brand/30 bg-surface text-accent"
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pt-5 lg:pt-7">
                <h3 className="heading-4">
                  <span className="sr-only">
                    {t.process.stepLabel} {index + 1}:{" "}
                  </span>
                  {step.title}
                </h3>
                <p className={`mt-2.5 ${styles.support}`}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
