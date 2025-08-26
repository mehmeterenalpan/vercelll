import { site } from "@/lib/site";
export const dynamic = 'error';
export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
