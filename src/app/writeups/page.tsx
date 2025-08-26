import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/PostCard";

export const dynamic = 'error';

export default function WriteupsPage() {
  const posts = allPosts
    .filter(p => p.published && (p.tags?.includes("writeup") || p.tags?.includes("ctf")))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">CTF & Challenge Write-ups</h1>
      <div className="grid gap-4">
        {posts.map((p) => <PostCard key={p._id} post={p} />)}
      </div>
    </div>
  );
}
