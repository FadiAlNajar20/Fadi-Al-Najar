// English text for the whole site. Keys mirror src/i18n/ar.js; ids match src/constants.

const en = {
  meta: {
    title: "Fadi Al-Najar | Landing Pages, Websites & Shopify Stores",
    description:
      "Freelance web developer building landing pages, business websites, Shopify stores and custom web apps.",
    ogDescription:
      "Landing pages, business websites, Shopify stores and custom web apps, from a developer you work with directly.",
    ogImage: "/og-image.jpg",
    ogImageAlt: "Fadi Al-Najar, freelance web developer: landing pages, websites and Shopify stores",
    personName: "Fadi Al-Najar",
    alternateName: "فادي النجار",
    jobTitle: "Full-Stack Web Developer",
    locality: "Amman",
    services: [
      "Landing page development",
      "Business website development",
      "Shopify store development",
      "Custom web app development",
    ],
  },

  common: {
    name: "Fadi Al-Najar",
    skipToContent: "Skip to content",
    newTab: "(opens in a new tab)",
  },

  nav: {
    label: "Main",
    links: { work: "Work", services: "Services", process: "Process", about: "About", contact: "Contact" },
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },

  hero: {
    eyebrow: "Freelance web developer",
    title: "Landing pages and websites built for your business",
    lead: "I turn your idea into a clear, fast website that works well on any device, from design and development to launch.",
    primaryCta: "Start a project",
    secondaryCta: "View my work",
    trust: ["Real client projects, live online", "Arabic and English websites", "You work with me directly"],
    caption: "Elevate Pro, a website in three languages for a law firm.",
    captionLink: "See the project",
    imageAlt: {
      desktop: "Elevate Pro website homepage in English",
      mobile: "Elevate Pro homepage in English on a phone",
    },
  },

  work: {
    eyebrow: "Selected work",
    title: "Real websites you can visit",
    description: "A few of the projects I’ve worked on. Open any of them and see for yourself.",
    featured: "Featured project",
    visit: "Visit website",
    highlightsTitle: "What I built",
    detailLabels: { role: "My role", stack: "Built with", languages: "Languages" },
  },

  projects: {
    "elevate-pro": {
      badge: "Built independently",
      type: "Company website",
      sector: "Law firm",
      location: "Riyadh",
      summary:
        "Website for a Riyadh-based law firm with offices in London and Guangzhou, presenting its services, team and offices.",
      details: { role: "Sole developer", stack: "Next.js", languages: "English, Arabic, Chinese" },
      highlights: [
        "Three languages, including right-to-left Arabic",
        "Pages for services, team and offices, with company profiles to download",
        "Consultation request form, WhatsApp and click-to-call",
        "SEO set up for all three languages",
      ],
      imageAlt: {
        desktop: "Elevate Pro homepage in Arabic, laid out right-to-left, on a desktop browser",
        mobile: "Elevate Pro homepage in Arabic on a phone",
      },
    },
    "muay-thai-fighters-academy": {
      context: "Developed as part of my work at E-Safqa",
      type: "Business website",
      sector: "Sports academy",
      location: "Amman, Jordan",
      summary:
        "Arabic and English website for a Muay Thai academy with seven branches in Amman. It introduces the coaches and training programs, and helps new members find the nearest branch.",
      highlights: [
        "Arabic first, with a full English version",
        "All seven branches in one place",
        "Local SEO for every branch",
      ],
      imageAlt: {
        desktop: "Muay Thai Fighters Academy homepage in Arabic on a desktop browser",
        mobile: "Muay Thai Fighters Academy homepage on a phone",
      },
    },
    "genie-perfume": {
      context: "Built on Shopify as part of my work at E-Safqa",
      type: "Shopify store",
      sector: "Perfume & beauty",
      location: "Jordan",
      summary:
        "Arabic online store for Genie Perfume, selling original perfumes and beauty products with delivery in Jordan.",
      highlights: [
        "Arabic store with prices in Jordanian dinar",
        "Shop by category or brand, with search",
        "WhatsApp chat for quick customer questions",
      ],
      imageAlt: {
        desktop: "Genie Perfume Shopify store homepage in Arabic on a desktop browser",
        mobile: "Genie Perfume Shopify store on a phone",
      },
    },
  },

  services: {
    eyebrow: "Services",
    title: "What I can build for your business",
    description:
      "I build landing pages, business websites, Shopify stores and web apps around your project needs. Everything I build is responsive, fast and easy to use.",
    featured: "Main service",
    idealFor: "Good for:",
    included: "What you get",
    agencyTitle: "Marketing agencies:",
    agencyText:
      "I can build from your team’s Figma designs, follow your brand guidelines and deliver projects under your agency’s name.",
    items: {
      "landing-page": {
        title: "Landing pages",
        summary:
          "A focused page for a service, product or idea, with a clear, fast design that helps visitors understand what you offer and take the next step easily.",
        idealFor: "Product launches, service pages and event sign-ups",
        points: [
          "Responsive design that loads fast",
          "Contact form or WhatsApp button",
          "Basic SEO setup",
          "Analytics and tracking tools, when needed",
          "Arabic, English or both",
          "Domain, SSL and launch taken care of",
        ],
        cta: "Plan a landing page",
      },
      "business-website": {
        title: "Business websites",
        summary:
          "A multi-page website that explains your company, services and team, and makes it easy for clients to get in touch.",
        points: [
          "Arabic and English, with proper right-to-left layout",
          "Contact form, WhatsApp and click-to-call",
          "Basic SEO setup",
        ],
        cta: "Discuss a company website",
      },
      shopify: {
        title: "Shopify stores",
        summary:
          "I set up your Shopify store and customise it for your products and customers, from choosing a theme to going live.",
        points: [
          "Theme setup, collections and menus",
          "Arabic storefront and local currency",
          "The apps your store needs, like WhatsApp chat",
        ],
        cta: "Talk about your store",
      },
      "web-app": {
        title: "Custom web apps",
        summary:
          "Dashboards, booking systems, customer portals and internal tools, for when a ready-made product doesn’t fit.",
        points: [
          "Admin dashboards with user roles",
          "Connections to the tools you already use",
          "Built with React, Next.js and Node.js",
        ],
        cta: "Discuss a web app",
      },
    },
  },

  process: {
    eyebrow: "Process",
    title: "A simple way to work together",
    description: "Clear steps from the first message to handover, so you always know what’s next.",
    stepLabel: "Step",
    steps: [
      {
        title: "Brief",
        text: "Tell me about your business, your goals and your deadline. I confirm the scope, timeline and cost in writing before I start.",
      },
      {
        title: "Plan & design",
        text: "I plan the pages and content, then we agree on the design, or I build from your designer’s files.",
      },
      {
        title: "Build & review",
        text: "You get a preview link to check on your phone and computer, and send feedback before launch.",
      },
      {
        title: "Launch & handover",
        text: "I publish the site, connect your domain, set up analytics if needed, and hand over everything you need.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "I build your website or app from start to launch",
    paragraphs: [
      "I’m Fadi, a web developer building websites and apps around what each project needs. I work across every part of the project and see it through from the first step to launch.",
      "From understanding what you need and planning, through development, review and handover, I stay directly involved at every stage and keep communication clear throughout.",
    ],
    points: [
      {
        id: "follow-through",
        title: "Full project follow-through",
        text: "I stay with the work from start to handover, not just one separate part of it.",
      },
      {
        id: "communication",
        title: "Clear communication",
        text: "We agree on what’s needed and the stages, so you always know where things stand.",
      },
      {
        id: "tailored",
        title: "Built around your needs",
        text: "I choose the approach and tools that fit your project, rather than one solution for everything.",
      },
    ],
    stackTitle: "Tools I work with",
    portraitAlt: "Portrait of Fadi Al-Najar",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let’s talk about your project",
    lead: "Have a new project, or a website that needs work? Get in touch, tell me what you need, and we’ll take it from there.",
    whatsappCta: "Chat on WhatsApp",
    emailCta: "Send an email",
    // The pre-filled WhatsApp message mentions the service picked in the Services section, if any.
    whatsappMessage: (topic) => `Hi Fadi, I saw your portfolio and I’d like to talk about ${topic}.`,
    whatsappTopics: {
      "landing-page": "a landing page",
      "business-website": "a business website",
      shopify: "a Shopify store",
      "web-app": "a custom web app",
      other: "a project",
    },
  },

  footer: {
    tagline: "Freelance web developer building landing pages, websites, Shopify stores and web apps.",
    explore: "Explore",
    contact: "Get in touch",
    links: { whatsapp: "WhatsApp", email: "Email", linkedin: "LinkedIn", github: "GitHub" },
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  whatsappButton: "Chat on WhatsApp",
};

export default en;
