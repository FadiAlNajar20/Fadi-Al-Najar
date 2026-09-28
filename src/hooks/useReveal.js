import { useEffect } from "react";

// Consecutive entrances start at least this far apart, and nobody waits longer than MAX_WAIT_MS.
const STAGGER_MS = 100;
const MAX_WAIT_MS = 600;
// Elements showing no more than this sliver at the bottom edge still count as below the fold.
const FOLD_SLIVER_PX = 32;

// Scroll entrances for [data-reveal] elements (styles in index.css).
// - Only elements that are still below the fold when JavaScript runs are hidden, so the pre-rendered
//   page never hides anything without JavaScript and nothing readable disappears on screen.
// - Each element enters once, when its top reaches 90% of the viewport height.
// - Elements that arrive close together (a heading's lines, a row of cards, a card and its screenshot)
//   are queued STAGGER_MS apart in document order, which is the reading order in both languages.
//   data-reveal-delay="<ms>" adds a fixed extra wait before one element.
// - Nothing is hidden or animated for reduced-motion users.
const useReveal = () => {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const pending = [...document.querySelectorAll("[data-reveal]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight - FOLD_SLIVER_PX
    );
    let nextSlot = 0;

    const reveal = (el) => {
      const now = performance.now();
      const start =
        Math.min(Math.max(now, nextSlot), now + MAX_WAIT_MS) + (Number(el.dataset.revealDelay) || 0);
      nextSlot = start + STAGGER_MS;
      el.style.setProperty("--reveal-delay", `${Math.round(start - now)}ms`);
      el.classList.replace("reveal-pending", "reveal-in");

      // animationend bubbles, so ignore the entrances of nested elements.
      const done = (event) => {
        if (event.target !== el) return;
        el.removeEventListener("animationend", done);
        el.classList.remove("reveal-in");
        el.style.removeProperty("--reveal-delay");
      };
      el.addEventListener("animationend", done);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
          .forEach((el) => {
            observer.unobserve(el);
            reveal(el);
          });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    pending.forEach((el) => {
      el.classList.add("reveal-pending");
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      pending.forEach((el) => {
        el.classList.remove("reveal-pending", "reveal-in");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
};

export default useReveal;
