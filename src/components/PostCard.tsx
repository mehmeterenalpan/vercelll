import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: any }) {
  return (
    <article className="rounded-2xl border border-border bg-card/40 p-5 hover:bg-card/60 transition-colors">
      <h2 className="text-xl font-semibold leading-tight">
        <Link href={post.url} className="hover:underline decoration-dotted">
          {post.title}
        </Link>
      </h2>
      <p className="mt-1 text-muted">{formatDate(post.date)} • {post.readingTime?.text ?? ""}</p>
      <p className="mt-3 text-sm text-muted">{post.description}</p>
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t: string) => (
            <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="text-xs border border-border rounded-full px-2 py-0.5 hover:bg-border/30">{t}</Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
