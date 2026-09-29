import { useMemo, useState } from "react";

import { About, CapabilityStrip, Contact, Footer, Hero, Navbar, Process, Services, WhatsAppButton, Works } from "./components";
import useReveal from "./hooks/useReveal";
import Hotjar from "./Hotjar";
import { I18nProvider } from "./i18n";
import { locales } from "./i18n/config";
import useLocaleState from "./i18n/useLocaleState";

// `locale` and `messages` are the language of the page that was loaded; the visitor can then switch
// language in place (see useLocaleState).
const App = ({ locale: initialLocale, messages: initialMessages }) => {
  const { locale, messages, setLocale } = useLocaleState(initialLocale, initialMessages);
  // Chosen from a service card; tailors the pre-filled WhatsApp message.
  const [projectType, setProjectType] = useState("");
  const i18n = useMemo(
    () => ({ locale, dir: locales[locale].dir, t: messages, setLocale }),
    [locale, messages, setLocale]
  );
  useReveal();

  return (
    <I18nProvider value={i18n}>
      <a href="#main" className="skip-link">
        {messages.common.skipToContent}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <CapabilityStrip />
        <Works />
        <Services onSelectProject={setProjectType} />
        <Process />
        <About />
        <Contact projectType={projectType} />
      </main>
      <Footer />
      <WhatsAppButton projectType={projectType} />
      <Hotjar />
    </I18nProvider>
  );
};

export default App;
