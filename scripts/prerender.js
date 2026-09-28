// Renders one static page per language after `vite build`: Arabic (the default) to dist/index.html
// and English to dist/en/index.html. Content is visible and crawlable before JavaScript loads, and
// the client then hydrates it (see src/main.jsx).
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const placeholder of ["<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(placeholder)) throw new Error(`dist/index.html is missing the ${placeholder} placeholder`);
}

const { render, defaultLocale, locales, localeStorageKey } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

// Preload the fonts each page needs straight away, and its language chunk (see src/main.jsx).
const assets = await fs.readdir(path.join(dist, "assets"));
const asset = (pattern) => assets.find((file) => pattern.test(file));
const latinFont = asset(/^plus-jakarta-sans-latin-wght-normal-.*\.woff2$/);
const arabicFont = asset(/^readex-pro-arabic-wght-normal-.*\.woff2$/);
const manifestPath = path.join(dist, "manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

const preloadFont = (file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;

const preloads = (locale) => {
  const chunk = manifest[`src/i18n/${locale}.js`]?.file;
  if (!chunk) throw new Error(`No build chunk found for src/i18n/${locale}.js`);
  return [
    locale === "ar" && arabicFont && preloadFont(arabicFont),
    latinFont && preloadFont(latinFont),
    `<link rel="modulepreload" crossorigin href="/${chunk}" />`,
  ].filter(Boolean);
};

// On the default page, send visitors who previously chose another language straight to it.
// Only an explicit choice in the language switcher is stored, so search engines always get "/".
// It only runs on a fresh visit, never on Back/Forward or reload, so it can't trap the Back button.
const rememberedLocaleRedirect = () => {
  const target = Object.values(locales)
    .filter(({ code }) => code !== defaultLocale)
    .map(({ code, path: localePath }) => `l===${JSON.stringify(code)}?${JSON.stringify(localePath)}:`)
    .join("");
  return `<script>try{var n=performance.getEntriesByType("navigation")[0];if(!n||n.type==="navigate"){var l=localStorage.getItem(${JSON.stringify(localeStorageKey)}),p=${target}"";if(p)location.replace(p+location.search+location.hash)}}catch(e){}</script>`;
};

for (const [locale, { dir, path: localePath }] of Object.entries(locales)) {
  const { html, head } = render(locale);
  const headTags = [...(locale === defaultLocale ? [rememberedLocaleRedirect()] : []), ...head, ...preloads(locale)];
  const page = template
    .replace(/<html[^>]*>/, `<html lang="${locale}" dir="${dir}">`)
    .replace("<!--app-head-->", headTags.join("\n    "))
    .replace("<!--app-html-->", html);

  const outFile = path.join(dist, localePath, "index.html");
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, page);
  console.log(`Pre-rendered ${path.relative(root, outFile)} (${(Buffer.byteLength(page) / 1024).toFixed(1)} kB)`);
}

await fs.rm(manifestPath);
await fs.rm(ssrDir, { recursive: true, force: true });
