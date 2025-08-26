import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const dynamic = 'error';

export default async function WriteupsPage() {
  const posts = (await getAllPosts())
    .filter(p => p.published && (p.tags.includes("writeup") || p.tags.includes("ctf")));
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">CTF & Challenge Write-ups</h1>
      <div className="grid gap-4">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}
