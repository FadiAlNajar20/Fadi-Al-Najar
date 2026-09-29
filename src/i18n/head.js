// The per-language <head> tags (title, description, canonical, hreflang, Open Graph, Twitter and
// structured data), built from `meta` in the locale files. The pre-renderer writes them into each page
// (renderHead); after a client-side language switch, applyHead updates the live document to match.
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

const metaName = (name, content) => ({ tag: "meta", key: "name", attrs: { name, content } });
const metaProperty = (property, content) => ({ tag: "meta", key: "property", attrs: { property, content } });

// One entry per tag: `tag`, its attributes, text for <title>/<script>, and `key`, the attribute that
// identifies the tag in the document (see applyHead).
const headTags = (locale, { meta }) => {
  const url = pageUrl(locale);
  const image = `${siteUrl}${meta.ogImage}`;
  const alternates = Object.keys(locales).filter((code) => code !== locale);

  return [
    { tag: "title", text: meta.title },
    metaName("description", meta.description),
    { tag: "link", key: "rel", attrs: { rel: "canonical", href: url } },
    ...Object.keys(locales).map((code) => ({
      tag: "link",
      key: "hreflang",
      attrs: { rel: "alternate", hreflang: code, href: pageUrl(code) },
    })),
    { tag: "link", key: "hreflang", attrs: { rel: "alternate", hreflang: "x-default", href: pageUrl(defaultLocale) } },
    metaProperty("og:type", "website"),
    metaProperty("og:site_name", meta.personName),
    metaProperty("og:locale", locales[locale].ogLocale),
    ...alternates.map((code) => metaProperty("og:locale:alternate", locales[code].ogLocale)),
    metaProperty("og:url", url),
    metaProperty("og:title", meta.title),
    metaProperty("og:description", meta.ogDescription),
    metaProperty("og:image", image),
    metaProperty("og:image:width", "1200"),
    metaProperty("og:image:height", "630"),
    metaProperty("og:image:alt", meta.ogImageAlt),
    metaName("twitter:card", "summary_large_image"),
    metaName("twitter:title", meta.title),
    metaName("twitter:description", meta.ogDescription),
    metaName("twitter:image", image),
    metaName("twitter:image:alt", meta.ogImageAlt),
    { tag: "script", key: "type", attrs: { type: "application/ld+json" }, text: JSON.stringify(structuredData(locale, meta)) },
  ];
};

const toHtml = ({ tag, attrs = {}, text }) => {
  const attributes = Object.entries(attrs)
    .map(([name, value]) => ` ${name}="${escapeHtml(value)}"`)
    .join("");
  if (tag === "title") return `<title>${escapeHtml(text)}</title>`;
  // "<" is escaped so the JSON can never close the <script> element early.
  if (tag === "script") return `<script${attributes}>${text.replace(/</g, "\\u003c")}</script>`;
  return `<${tag}${attributes} />`;
};

export function renderHead(locale, messages) {
  return headTags(locale, messages).map(toHtml);
}

// Brings the live <head> in line with `locale`: tags with the same identity (for example
// meta[property="og:title"]) are updated in place, and any that are missing (the dev server's plain
// template) are added.
export function applyHead(locale, messages) {
  const { head } = document;
  const used = new Set();

  for (const { tag, key, attrs = {}, text } of headTags(locale, messages)) {
    const selector = key ? `${tag}[${key}="${attrs[key]}"]` : tag;
    let el = [...head.querySelectorAll(selector)].find((candidate) => !used.has(candidate));
    if (!el) {
      el = document.createElement(tag);
      head.appendChild(el);
    }
    used.add(el);
    Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
    if (text !== undefined) el.textContent = text;
  }
}
