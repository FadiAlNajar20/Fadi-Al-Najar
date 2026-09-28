import { useI18n } from "../i18n";
import { styles } from "../styles";
import SectionHeading from "./SectionHeading";

const Process = () => {
  const { t } = useI18n();

  return (
    <section id="process" aria-labelledby="process-title" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          id="process-title"
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />

        <ol className={`${styles.sectionBody} grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6`}>
          {t.process.steps.map((step, index) => (
            <li key={step.title} className={`lift ${styles.card} p-6 sm:p-7`} data-reveal>
              <span className="text-sm font-semibold tabular-nums text-brand" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="heading-4 mt-3">
                <span className="sr-only">
                  {t.process.stepLabel} {index + 1}:{" "}
                </span>
                {step.title}
              </h3>
              <p className={`mt-3 ${styles.support}`}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
