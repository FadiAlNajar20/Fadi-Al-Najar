// Screenshots are exported at several widths as `<name>-<width>.webp` in src/assets/work.
const files = import.meta.glob("../assets/work/*.webp", { eager: true, import: "default" });

const variants = {};
for (const [path, url] of Object.entries(files)) {
  const match = path.match(/\/([a-z0-9-]+)-(\d+)\.webp$/);
  if (!match) continue;
  const [, name, width] = match;
  (variants[name] ??= []).push({ url, width: Number(width) });
}

export function screenshot(name) {
  const list = variants[name]?.sort((a, b) => a.width - b.width);
  if (!list?.length) throw new Error(`Missing screenshot "${name}" in src/assets/work`);
  const fallback = list.find((v) => v.width >= 960) ?? list[list.length - 1];
  return {
    src: fallback.url,
    srcSet: list.map((v) => `${v.url} ${v.width}w`).join(", "),
  };
}
