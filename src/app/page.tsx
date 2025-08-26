import { allPosts } from ".contentlayer/generated";
import PostCard from "@/components/PostCard";
import Search from "@/components/Search";

export const dynamic = 'error'; // enable static export

export default function HomePage() {
  const posts = allPosts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-card/40 p-6">
        <h1 className="text-2xl font-semibold">Security Research & Write-ups</h1>
        <p className="mt-2 text-sm text-muted">Red team tactics, phishing research, malware dev notes, and CTF write-ups by <span className="text-white font-medium">segv0</span>.</p>
        <div className="mt-4">
          <Search />
        </div>
      </section>
      <section className="grid gap-4">
        {posts.map((p) => <PostCard key={p._id} post={p} />)}
      </section>
    </div>
  );
}
