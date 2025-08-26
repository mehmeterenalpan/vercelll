import PostCard from "@/components/PostCard";
import Search from "@/components/Search";
import { getAllPosts } from "@/lib/posts";

export const dynamic = 'error';

export default async function HomePage() {
  const posts = (await getAllPosts()).filter(p => p.published);
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-card/40 p-6">
        <h1 className="text-2xl font-semibold">Security Research & Write-ups</h1>
        <p className="mt-2 text-sm text-muted">
          Red team tactics, malware dev notes, and CTF write-ups by <span className="text-white font-medium">segv0</span>.
        </p>
        <div className="mt-4">
          <Search />
        </div>
      </section>
      <section className="grid gap-4">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </section>
    </div>
  );
}
