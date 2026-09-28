// Each line enters separately, so the label, title and description arrive one after another.
const SectionHeading = ({ id, eyebrow, title, description }) => (
  <div className="max-w-2xl">
    <p className="eyebrow" data-reveal>
      {eyebrow}
    </p>
    <h2 id={id} className="heading-2 mt-3" data-reveal>
      {title}
    </h2>
    {description && (
      <p className="text-lead mt-4" data-reveal>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
