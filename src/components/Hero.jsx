import { LuArrowRight, LuCheck, LuCode2 } from "react-icons/lu";

import { heroMedia } from "../constants";
import { keepTogether, useI18n } from "../i18n";
import { styles } from "../styles";
import { screenshot } from "../utils/images";
import { BrowserFrame, PhoneFrame } from "./DeviceFrames";

// The title with its accent words in coral and a hand-drawn underline that draws in after the line lands.
// #E94339 rather than #FF4A3F keeps the words above 3:1 (large text) over the soft coral shape.
const Title = ({ title, accent }) => {
  const index = accent ? title.indexOf(accent) : -1;
  if (index < 0) return title;

  return (
    <>
      {title.slice(0, index)}
      <span className="relative inline-block whitespace-nowrap text-brand-hover">
        {accent}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          className="hero-underline absolute inset-x-0 -bottom-1.5 h-2.5 w-full sm:-bottom-2 sm:h-3"
          style={{ "--delay": "900ms" }}
        >
          <path
            d="M3 8.5C55 3 140 2.5 197 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {title.slice(index + accent.length)}
    </>
  );
};

// Decorations only (aria-hidden): soft color shapes, a dotted texture and a thin curve behind the
// hero, then small floating pieces around the screenshots. Each floats on its own rhythm.
const Ambient = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10"
  >
    <div
      className="hero-fade-in absolute -top-40 end-[-12rem] h-[640px] w-[640px] sm:end-[-6rem]"
      style={{ "--delay": "300ms" }}
    >
      <div className="drift h-full w-full rounded-full bg-[radial-gradient(closest-side,rgb(var(--brand)/0.09),transparent)]" />
    </div>
    <div
      className="hero-fade-in absolute -bottom-48 start-[-10rem] h-[560px] w-[560px] lg:start-[20%]"
      style={{ "--delay": "500ms" }}
    >
      <div
        className="drift h-full w-full rounded-full bg-[radial-gradient(closest-side,rgb(var(--cool)/0.08),transparent)]"
        style={{ animationDelay: "-8s" }}
      />
    </div>
    <div
      className="dot-grid hero-fade-in absolute end-0 top-20 hidden h-[460px] w-[58%] [mask-image:radial-gradient(closest-side,black,transparent)] lg:block"
      style={{ "--delay": "900ms" }}
    />
  </div>
);

const FloatingCard = () => (
  <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2.5 shadow-float">
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-green text-whatsapp">
      <LuCheck className="h-4 w-4" />
    </span>
    <span className="space-y-1.5">
      <span className="block h-1.5 w-16 rounded-full bg-fg/15" />
      <span className="block h-1.5 w-10 rounded-full bg-fg/10" />
    </span>
  </div>
);

const Hero = () => {
  const { t, locale } = useI18n();
  const media = heroMedia[locale];
  const desktop = screenshot(media.desktop);
  const mobile = screenshot(media.mobile);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40"
    >
      <Ambient />

      <div
        className={`${styles.container} grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12`}
      >
        <div>
          <p className="eyebrow hero-in" style={{ "--delay": "120ms" }}>
            {t.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="heading-1 hero-in mt-6"
            style={{ "--delay": "200ms" }}
          >
            <Title title={t.hero.title} accent={t.hero.titleAccent} />
          </h1>
          <p
            className="text-lead hero-in mt-6 max-w-xl"
            style={{ "--delay": "290ms" }}
          >
            {t.hero.lead}
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 xs:flex-row"
            style={{ "--delay": "380ms" }}
          >
            <a
              href="#contact"
              className="btn btn-primary sm:min-h-[52px] sm:px-7"
            >
              {t.hero.primaryCta}
              <LuArrowRight
                className={`nudge nudge-forward h-4 w-4 ${styles.flip}`}
                aria-hidden="true"
              />
            </a>
            <a
              href="#work"
              className="btn btn-secondary sm:min-h-[52px] sm:px-7"
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          <ul
            className="hero-in mt-10 flex flex-col gap-3 text-[0.9375rem] font-medium text-fg-body sm:flex-row sm:flex-wrap sm:gap-x-6"
            style={{ "--delay": "470ms" }}
          >
            {t.hero.trust.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-accent">
                  <LuCheck className="h-3 w-3" aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div className="relative pb-8 ps-7 pt-5 sm:pb-12 sm:ps-12 sm:pt-6">
            {/* Thin curve and small dots behind the screenshots. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 300"
              fill="none"
              className="hero-fade-in absolute -inset-x-6 -top-6 -z-10 h-[115%] w-[calc(100%+3rem)] text-brand/25 rtl:-scale-x-100"
              style={{ "--delay": "1100ms" }}
            >
              <path
                d="M-10 250C60 120 170 300 250 170S380 40 420 70"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>

            <div className="hero-media-in" style={{ "--delay": "450ms" }}>
              <div
                className="float"
                style={{
                  "--float": "4px",
                  "--float-duration": "3s",
                  "--float-delay": "1s",
                }}
              >
                <BrowserFrame url={media.frameUrl}>
                  <img
                    src={desktop.src}
                    srcSet={desktop.srcSet}
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 80vw, 88vw"
                    width="1600"
                    height="1000"
                    alt={t.hero.imageAlt.desktop}
                    fetchpriority="high"
                    className="h-full w-full object-cover object-top"
                  />
                </BrowserFrame>
              </div>
            </div>

            <div
              className="hero-phone-in absolute bottom-0 start-0 w-[24%] min-w-[78px]"
              style={{ "--delay": "700ms" }}
            >
              <div
                className="float"
                style={{
                  "--float": "6px",
                  "--float-duration": "2.8s",
                  "--float-delay": "1s",
                }}
              >
                <PhoneFrame>
                  <img
                    src={mobile.src}
                    srcSet={mobile.srcSet}
                    sizes="(min-width: 1024px) 130px, 22vw"
                    width="480"
                    height="1039"
                    alt={t.hero.imageAlt.mobile}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </PhoneFrame>
              </div>
            </div>

            <div aria-hidden="true">
              <div
                className="hero-fade-in absolute -top-3 end-3 hidden sm:block"
                style={{ "--delay": "1000ms" }}
              >
                <div
                  className="float"
                  style={{
                    "--float": "3px",
                    "--float-duration": "4.4s",
                    "--float-delay": "1.2s",
                  }}
                >
                  <FloatingCard />
                </div>
              </div>
              <div
                className="hero-fade-in absolute -end-2 bottom-3 sm:-end-4 sm:bottom-6"
                style={{ "--delay": "1150ms" }}
              >
                <div
                  className="float"
                  style={{
                    "--float": "4px",
                    "--float-duration": "5.6s",
                    "--float-delay": "1.4s",
                  }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-float sm:h-12 sm:w-12">
                    <LuCode2 className="h-5 w-5" />
                  </span>
                </div>
              </div>
              <span
                className="hero-fade-in absolute end-[42%] top-0 h-2.5 w-2.5 rounded-full bg-brand/70"
                style={{ "--delay": "1250ms" }}
              />
              <span
                className="hero-fade-in absolute bottom-1 start-[38%] h-2 w-2 rounded-full bg-cool/60"
                style={{ "--delay": "1300ms" }}
              />
            </div>
          </div>
          <figcaption
            className="hero-in mt-5 text-[0.9375rem] leading-relaxed text-fg-secondary"
            style={{ "--delay": "900ms" }}
          >
            {keepTogether(t.hero.caption)}{" "}
            <a href="#elevate-pro" className="text-link font-medium">
              {t.hero.captionLink}
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
