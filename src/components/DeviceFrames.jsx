// Lightweight browser and phone frames used to present project screenshots.

export const BrowserFrame = ({ url, children, className = "" }) => (
  <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-frame ${className}`}>
    {/* Browser chrome stays left-to-right in both languages, like the URL it shows. */}
    <div
      aria-hidden="true"
      dir="ltr"
      className="flex h-7 items-center gap-3 border-b border-white/[0.06] bg-ink-800 px-3 sm:h-8"
    >
      <span className="flex shrink-0 gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
      </span>
      <span className="mx-auto min-w-0 max-w-[70%] truncate rounded bg-white/[0.06] px-3 py-0.5 text-[10px] text-zinc-400 sm:text-[11px]">
        {url}
      </span>
      <span className="w-8 shrink-0 sm:w-10" />
    </div>
    <div className="aspect-[16/10] bg-ink-850">{children}</div>
  </div>
);

export const PhoneFrame = ({ children, className = "" }) => (
  <div
    className={`rounded-[1.1rem] border border-white/[0.15] bg-ink-950 p-1 shadow-frame sm:rounded-[1.5rem] sm:p-1.5 ${className}`}
  >
    <div className="aspect-[390/844] overflow-hidden rounded-[0.8rem] bg-ink-850 sm:rounded-[1.15rem]">{children}</div>
  </div>
);
