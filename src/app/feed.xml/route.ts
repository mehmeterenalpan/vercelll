import { allPosts } from ".contentlayer/generated";
import { site } from "@/lib/site";

export const dynamic = 'error';

export async function GET() {
  const posts = allPosts.filter(p => p.published).sort((a,b) => +new Date(b.date) - +new Date(a.date));
  const items = posts.map(p => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${site.url}${p.url}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <guid>${site.url}${p.url}</guid>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel>
      <title>${escapeXml(site.title)}</title>
      <link>${site.url}</link>
      <description>${escapeXml(site.description)}</description>
      ${items}
    </channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml" } });
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'} as any)[c]);
}
