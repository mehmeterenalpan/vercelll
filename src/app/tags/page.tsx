import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const dynamic = 'error';

export default async function TagsPage() {
  const posts = (await getAllPosts()).filter(p => p.published);
  const tagCounts = new Map<string, number>();
  posts.forEach(p => p.tags.forEach(t => tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)));
  const tags = Array.from(tagCounts.entries()).sort((a,b) => b[1]-a[1]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map(([t,c]) => (
          <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="border border-border rounded-full px-3 py-1 hover:bg-border/30">
            {t} <span className="text-muted text-xs ms-1">{c}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
