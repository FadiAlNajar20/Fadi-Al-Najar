// Builds the per-language <head> tags (title, description, canonical, hreflang, Open Graph, Twitter
// and structured data). Only used at build time by the pre-renderer.
import { contact, siteUrl, stack } from "../constants";
import { defaultLocale, locales } from "./config";

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const pageUrl = (locale) => `${siteUrl}${locales[locale].path}`;

const structuredData = (locale, meta) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: meta.personName,
      alternateName: meta.alternateName,
      jobTitle: meta.jobTitle,
      url: pageUrl(defaultLocale),
      email: `mailto:${contact.email}`,
      address: { "@type": "PostalAddress", addressLocality: meta.locality, addressCountry: "JO" },
      sameAs: [contact.linkedin, contact.github],
      knowsAbout: [...meta.services, ...stack],
      makesOffer: meta.services.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: pageUrl(defaultLocale),
      name: meta.personName,
      inLanguage: Object.keys(locales),
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl(locale)}#webpage`,
      url: pageUrl(locale),
      name: meta.title,
      description: meta.description,
      inLanguage: locale,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
    },
  ],
});

export function renderHead(locale, { meta }) {
  const url = pageUrl(locale);
  const image = `${siteUrl}${meta.ogImage}`;
  const alternates = Object.keys(locales).filter((code) => code !== locale);
  // "<" is escaped so the JSON can never close the <script> element early.
  const json = JSON.stringify(structuredData(locale, meta)).replace(/</g, "\\u003c");

  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...Object.keys(locales).map((code) => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(defaultLocale)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(meta.personName)}" />`,
    `<meta property="og:locale" content="${locales[locale].ogLocale}" />`,
    ...alternates.map((code) => `<meta property="og:locale:alternate" content="${locales[code].ogLocale}" />`),
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ];
}
