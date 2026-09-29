// Shared layout classes, so every section uses the same grid and spacing.
// The type scale (eyebrow, heading-1…4, text-lead) is defined in index.css, with its Arabic adjustments.
const styles = {
  container: "mx-auto w-full max-w-6xl px-5 sm:px-8",
  section: "py-20 sm:py-24 lg:py-28",
  sectionBody: "mt-12 lg:mt-16",
  // White card on the white page, separated by a thin border and a soft shadow.
  card: "rounded-2xl border border-line bg-surface shadow-card",
  // The one highlighted card or panel of a section: larger radius, coral border, white fading from a
  // faint coral tint at the top.
  cardFeatured:
    "relative overflow-hidden rounded-3xl border border-brand/25 bg-surface bg-[linear-gradient(to_bottom,rgb(var(--surface-tint)),rgb(var(--surface))_60%)] shadow-card",
  // Supporting text inside cards and lists.
  support: "text-[0.9375rem] leading-relaxed text-fg-secondary sm:text-base",
  list: "space-y-3 text-[0.9375rem] leading-relaxed text-fg-body sm:text-base",
  meta: "text-sm leading-relaxed text-fg-muted",
  // Icon that follows the reading direction (an arrow pointing "forward").
  flip: "rtl:-scale-x-100",
};

export { styles };
