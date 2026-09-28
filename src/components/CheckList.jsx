import { LuCheck } from "react-icons/lu";

// Checkmark list. The icon box is one line tall (1lh), so it stays centred on the first line in both
// languages even though Arabic uses a taller line-height.
const CheckList = ({ items, className = "" }) => (
  <ul className={className}>
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="flex h-[1lh] shrink-0 items-center">
          <LuCheck className="h-4 w-4 text-brand" aria-hidden="true" />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default CheckList;
