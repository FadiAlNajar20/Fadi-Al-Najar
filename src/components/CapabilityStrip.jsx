import { serviceIds, stack } from "../constants";
import { useI18n } from "../i18n";

// Slow strip under the hero listing the services and tools already named on the page. It repeats
// that content, so it is hidden from screen readers. Two identical copies move by one copy's width,
// in the reading direction, and stand still for reduced-motion users (index.css).
const CapabilityStrip = () => {
  const { t } = useI18n();
  const items = [...serviceIds.map((id) => t.services.items[id].title), ...stack];

  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-line bg-surface py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:py-5"
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center whitespace-nowrap text-[0.9375rem] font-semibold text-fg-body sm:text-base"
              >
                <span className="px-5 sm:px-7">{item}</span>
                <span className="text-sm text-brand">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CapabilityStrip;
