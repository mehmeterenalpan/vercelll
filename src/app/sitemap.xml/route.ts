import { allPosts } from ".contentlayer/generated";
import { site } from "@/lib/site";

export const dynamic = 'error';

export async function GET() {
  const pages = ["/", "/writeups", "/tags", "/about"];
  const posts = allPosts.map(p => p.url);
  const urls = [...pages, ...posts];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(u => `<url><loc>${site.url}${u}</loc></url>`).join("")}
  </urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
