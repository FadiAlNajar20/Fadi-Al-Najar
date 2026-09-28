import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import useWhatsappLink from "../hooks/useWhatsappLink";
import { useI18n } from "../i18n";

// Floating shortcut shown after the hero, hidden while the contact section or footer is on screen.
// It sits at the end of the reading direction: bottom-right in English, bottom-left in Arabic.
const WhatsAppButton = ({ projectType }) => {
  const { t } = useI18n();
  const href = useWhatsappLink(projectType);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const blockers = [document.getElementById("contact"), document.querySelector("footer")].filter(Boolean);
    const onScreen = new Set();

    const update = () => setVisible(window.scrollY > window.innerHeight * 0.7 && onScreen.size === 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target)));
      update();
    });
    blockers.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.whatsappButton} ${t.common.newTab}`}
      className={`fixed bottom-5 end-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/40 transition-[opacity,transform,visibility] duration-300 hover:bg-[#1fb957] sm:bottom-6 sm:end-6 ${
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
    </a>
  );
};

export default WhatsAppButton;
