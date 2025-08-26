import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const dynamic = 'error';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ tag: t }));
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const dec = decodeURIComponent(params.tag);
  const posts = (await getAllPosts())
    .filter(p => p.published && p.tags.includes(dec));
  if (!posts.length) return notFound();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tag: {dec}</h1>
      <div className="grid gap-4">
        {posts.map(p => <PostCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}
