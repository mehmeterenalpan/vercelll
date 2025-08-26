import { notFound } from "next/navigation";
import { allPosts } from ".contentlayer/generated";
import MDXContent from "@/components/MDXContent";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = 'error';

export async function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();
  return (
    <article className="prose prose-invert">
      <h1 className="mb-0">{post.title}</h1>
      <p className="mt-0 text-sm text-muted">{formatDate(post.date)} • {post.readingTime?.text ?? ""}</p>
      <MDXContent code={post.body.code} />
    </article>
  );
}
