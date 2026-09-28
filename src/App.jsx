import { useMemo, useState } from "react";

import { About, Contact, Footer, Hero, Navbar, Process, Services, WhatsAppButton, Works } from "./components";
import useReveal from "./hooks/useReveal";
import Hotjar from "./Hotjar";
import { I18nProvider } from "./i18n";
import { locales } from "./i18n/config";

const App = ({ locale, messages }) => {
  // Chosen from a service card; tailors the pre-filled WhatsApp message.
  const [projectType, setProjectType] = useState("");
  const i18n = useMemo(() => ({ locale, dir: locales[locale].dir, t: messages }), [locale, messages]);
  useReveal();

  return (
    <I18nProvider value={i18n}>
      <a href="#main" className="skip-link">
        {messages.common.skipToContent}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
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
