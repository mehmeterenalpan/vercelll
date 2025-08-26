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

const escapeXml = (s) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // tarama
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

  // search.json
  await fs.writeFile(path.join(OUT_DIR, "search.json"), JSON.stringify(items, null, 2), "utf8");

  // feed.xml (RSS)
  const siteUrl = "https://segv0.pw";
  const rssItems = items
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map(
      (p) =>
        `<item><title>${escapeXml(p.title)}</title><link>${siteUrl}${p.url}</link><pubDate>${new Date(
          p.date
        ).toUTCString()}</pubDate><description>${escapeXml(p.description)}</description><guid>${siteUrl}${p.url}</guid></item>`
    )
    .join("");
  const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>segv0 — Security Research & Write-ups</title><link>${siteUrl}</link><description>Notes on red teaming, web security, malware dev, and CTF write-ups by segv0.</description>${rssItems}</channel></rss>`;
  await fs.writeFile(path.join(OUT_DIR, "feed.xml"), rss, "utf8");

  // sitemap.xml
  const staticPages = ["/", "/writeups", "/tags", "/about"];
  const postUrls = items.map((p) => p.url);
  const urls = [...staticPages, ...postUrls];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((u) => `<url><loc>${siteUrl}${u}</loc></url>`)
    .join("")}</urlset>`;
  await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap, "utf8");

  // robots.txt
  const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml`;
  await fs.writeFile(path.join(OUT_DIR, "robots.txt"), robots, "utf8");

  console.log("Wrote out/search.json, out/feed.xml, out/sitemap.xml, out/robots.txt");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
