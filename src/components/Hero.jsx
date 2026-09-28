import { LuArrowRight, LuCheck } from "react-icons/lu";

import { heroMedia } from "../constants";
import { keepTogether, useI18n } from "../i18n";
import { styles } from "../styles";
import { screenshot } from "../utils/images";
import { BrowserFrame, PhoneFrame } from "./DeviceFrames";

const Hero = () => {
  const { t, locale } = useI18n();
  const media = heroMedia[locale];
  const desktop = screenshot(media.desktop);
  const mobile = screenshot(media.mobile);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* Soft accent glow behind the screenshot side of the layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(55%_60%_at_75%_0%,rgba(255,74,63,0.13),transparent_70%)] rtl:bg-[radial-gradient(55%_60%_at_25%_0%,rgba(255,74,63,0.13),transparent_70%)]"
      />

      <div className={`${styles.container} grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12`}>
        <div>
          <p className="eyebrow hero-in">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="heading-1 hero-in mt-4" style={{ "--delay": "80ms" }}>
            {t.hero.title}
          </h1>
          <p className="text-lead hero-in mt-6 max-w-xl" style={{ "--delay": "160ms" }}>
            {t.hero.lead}
          </p>

          <div className="hero-in mt-8 flex flex-col gap-3 xs:flex-row" style={{ "--delay": "240ms" }}>
            <a href="#contact" className="btn btn-primary">
              {t.hero.primaryCta}
              <LuArrowRight className={`nudge nudge-forward h-4 w-4 ${styles.flip}`} aria-hidden="true" />
            </a>
            <a href="#work" className="btn btn-secondary">
              {t.hero.secondaryCta}
            </a>
          </div>

          <ul
            className="hero-in mt-10 flex flex-col gap-3 text-[0.9375rem] text-zinc-400 sm:flex-row sm:flex-wrap sm:gap-x-6"
            style={{ "--delay": "320ms" }}
          >
            {t.hero.trust.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <LuCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero-media-in relative mx-auto w-full max-w-2xl lg:max-w-none" style={{ "--delay": "200ms" }}>
          <div className="relative pb-6 ps-6 sm:pb-10 sm:ps-10">
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
            <PhoneFrame className="absolute bottom-0 start-0 w-[24%] min-w-[78px]">
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
          <figcaption className="mt-5 text-[0.9375rem] leading-relaxed text-zinc-400">
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
