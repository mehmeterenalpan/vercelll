import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import PostCard from "@/components/PostCard";

export const dynamic = 'error';

export default function TagPage({ params }: { params: { tag: string } }) {
  const dec = decodeURIComponent(params.tag);
  const posts = allPosts.filter(p => p.published && (p.tags ?? []).includes(dec))
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (!posts.length) return notFound();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tag: {dec}</h1>
      <div className="grid gap-4">
        {posts.map(p => <PostCard key={p._id} post={p} />)}
      </div>
    </div>
  );
}
