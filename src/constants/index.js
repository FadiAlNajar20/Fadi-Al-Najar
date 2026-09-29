// Contact details, links and project data that are the same in every language.
// All visible text lives in the locale files: src/i18n/ar.json and src/i18n/en.json.

export const siteUrl = "https://portfolio-umber-nine-67.vercel.app";

export const contact = {
  name: "Fadi Al-Najar",
  email: "fadi.alnajar20@gmail.com",
  whatsappNumber: "962780539417",
  whatsappDisplay: "+962 78 053 9417",
  linkedin: "https://www.linkedin.com/in/fadi-al-najar/",
  github: "https://github.com/FadiAlNajar20",
};

export const whatsappLink = (message) => `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

// Section anchors, in page order. Their labels come from `nav.links` in the locale files.
export const sectionIds = ["work", "services", "process", "about", "contact"];

// The first service is the highlighted one.
export const serviceIds = ["landing-page", "business-website", "shopify", "web-app"];

// Screenshots are referenced by name (see src/utils/images.js). The hero shows Elevate Pro in the
// visitor's language, so its case study shows the other language version.
export const heroMedia = {
  ar: { desktop: "elevate-ar-desktop", mobile: "elevate-ar-mobile", frameUrl: "elevpro.sa/ar" },
  en: { desktop: "elevate-en-desktop", mobile: "elevate-en-mobile", frameUrl: "elevpro.sa/en" },
};

const sameInBoth = (value) => ({ ar: value, en: value });

// The first project is featured. Text for each project is keyed by `id` in the locale files.
export const projects = [
  {
    id: "elevate-pro",
    name: "Elevate Pro",
    url: { ar: "https://elevpro.sa/ar", en: "https://elevpro.sa/en" },
    media: {
      ar: { desktop: "elevate-en-desktop", mobile: "elevate-en-mobile", frameUrl: "elevpro.sa/en" },
      en: { desktop: "elevate-ar-desktop", mobile: "elevate-ar-mobile", frameUrl: "elevpro.sa/ar" },
    },
  },
  {
    id: "muay-thai-fighters-academy",
    name: "Muay Thai Fighters Academy",
    url: {
      ar: "https://team.muay-thai-fighters-academy.com/",
      en: "https://team.muay-thai-fighters-academy.com/en",
    },
    media: sameInBoth({
      desktop: "muay-thai-desktop",
      mobile: "muay-thai-mobile",
      frameUrl: "team.muay-thai-fighters-academy.com",
    }),
  },
  {
    id: "genie-perfume",
    name: "Genie Perfume",
    url: sameInBoth("https://genieperfume.shop/"),
    media: sameInBoth({ desktop: "genie-perfume-desktop", mobile: "genie-perfume-mobile", frameUrl: "genieperfume.shop" }),
  },
];

export const stack = ["React", "Next.js", "React Native", "Node.js", "NestJS", "PostgreSQL", "Shopify", "Tailwind CSS"];
