import { useEffect } from "react";

let started = false;

// Loads Hotjar once the page has finished loading, and only when a site ID is configured.
function Hotjar() {
  useEffect(() => {
    const siteId = import.meta.env.VITE_APP_EMAILJS_HOTJAR_ID;
    if (!siteId || started) return;
    started = true;

    const load = () => {
      window.hj =
        window.hj ||
        function () {
          (window.hj.q = window.hj.q || []).push(arguments);
        };
      window._hjSettings = { hjid: siteId, hjsv: 6 };
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://static.hotjar.com/c/hotjar-${siteId}.js?sv=6`;
      document.head.appendChild(script);
    };

    const whenIdle = () => (window.requestIdleCallback ? window.requestIdleCallback(load) : setTimeout(load, 1500));
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
  }, []);

  return null;
}

export default Hotjar;
