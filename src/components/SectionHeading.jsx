// Each line enters separately, so the label, title and description arrive one after another.
// `center` sets the heading over the middle of the section, for a change of rhythm: a quieter label,
// wider gaps between the three lines and a softer, narrower description.
const SectionHeading = ({ id, eyebrow, title, description, center = false }) => (
  <div className={center ? "mx-auto flex max-w-2xl flex-col items-center text-center" : "max-w-2xl"}>
    <p className={center ? "eyebrow eyebrow-quiet" : "eyebrow"} data-reveal>
      {eyebrow}
    </p>
    <h2 id={id} className={`heading-2 ${center ? "mt-6 sm:mt-7" : "mt-5"}`} data-reveal>
      {title}
    </h2>
    {description && (
      <p className={center ? "text-lead mt-8 max-w-xl text-fg-muted" : "text-lead mt-5"} data-reveal>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
