import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import { compileMDX } from "next-mdx-remote/rsc";

export const dynamic = 'error';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.published) return notFound();

  const { content } = await compileMDX<{ }>(
    {
      source: post.body,
      options: {
        parseFrontmatter: false,
        mdxOptions: { remarkPlugins: [remarkGfm] }
      }
    }
  );

  return (
    <article className="prose prose-invert">
      <h1 className="mb-0">{post.title}</h1>
      <p className="mt-0 text-sm text-muted">
        {formatDate(post.date)} • {post.readingTime.text}
      </p>
      {content}
    </article>
  );
}
