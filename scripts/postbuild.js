import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content", "posts");
const OUT_DIR = path.join(ROOT, "out");

function fmToObj(data) {
  return {
    title: String(data.title || ""),
    date: String(data.date || ""),
    description: String(data.description || ""),
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published !== false
  };
}

const escape = (s) => s.replace(/[<>&'"]/g, (c) => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));

async function main() {
  const files = await fg("**/*.mdx", { cwd: CONTENT_DIR });
  const items = [];
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const src = await fs.readFile(full, "utf8");
    const { data } = matter(src);
    const fm = fmToObj(data);
    if (!fm.published) continue;
    const slug = file.replace(/\.mdx$/, "");
    items.push({
      title: fm.title,
      description: fm.description,
      url: `/posts/${slug}`,
      tags: fm.tags,
      date: fm.date
    });
  }
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUT_DIR, "search.json"), JSON.stringify(items, null, 2), "utf8");
  // RSS
  const rssItems = items
    .sort((a,b) => +new Date(b.date) - +new Date(a.date))
    .map(p => `<item><title>${escape(p.title)}</title><link>https://segv0.pw${p.url}</link><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${escape(p.description)}</description><guid>https://segv0.pw${p.url}</guid></item>`)
    .join("");
  const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>segv0 — Security Research & Write-ups</title><link>https://segv0.pw</link><description>Notes on red teaming, web security, malware dev, and CTF write-ups by segv0.</description>${rssItems}</channel></rss>`;
  await fs.writeFile(path.join(OUT_DIR, "feed.xml"), rss, "utf8");
  console.log("Wrote out/search.json and out/feed.xml");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
