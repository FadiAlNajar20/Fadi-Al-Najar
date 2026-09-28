// Shared layout classes, so every section uses the same grid and spacing.
// The type scale (eyebrow, heading-1…4, text-lead) is defined in index.css, with its Arabic adjustments.
const styles = {
  container: "mx-auto w-full max-w-6xl px-5 sm:px-8",
  section: "py-20 sm:py-24 lg:py-28",
  sectionBody: "mt-12 lg:mt-14",
  card: "rounded-2xl border border-white/[0.08] bg-ink-900",
  // Supporting text inside cards and lists.
  support: "text-[0.9375rem] leading-relaxed text-zinc-400 sm:text-base",
  list: "space-y-3 text-[0.9375rem] leading-relaxed text-zinc-300 sm:text-base",
  meta: "text-sm leading-relaxed text-zinc-400",
  // Icon that follows the reading direction (an arrow pointing "forward").
  flip: "rtl:-scale-x-100",
};

export { styles };
