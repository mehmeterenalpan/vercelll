import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  cover?: string;
};

export type Post = PostMeta & {
  slug: string;
  url: string;
  body: string;
  readingTime: { text: string; minutes: number; words: number };
};

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<Post[]> {
  const files = await fg("**/*.mdx", { cwd: CONTENT_DIR, dot: false });
  const posts: Post[] = [];
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const src = await fs.readFile(full, "utf8");
    const { data, content } = matter(src);
    const meta = data as Partial<PostMeta>;

    if (!meta.title || !meta.date || !meta.description) continue;

    const slug = file.replace(/\.mdx$/, "");
    posts.push({
      title: meta.title!,
      date: String(meta.date),
      description: meta.description!,
      tags: (meta.tags as string[] | undefined) ?? [],
      published: meta.published !== false,
      cover: meta.cover,
      slug,
      url: `/posts/${slug}`,
      body: content,
      readingTime: readingTime(content)
    });
  }
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.filter(p => p.published).forEach(p => (p.tags ?? []).forEach(t => set.add(t)));
  return Array.from(set).sort();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const full = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const src = await fs.readFile(full, "utf8");
    const { data, content } = matter(src);
    const meta = data as Partial<PostMeta>;
    if (!meta.title || !meta.date || !meta.description) return null;
    return {
      title: meta.title!,
      date: String(meta.date),
      description: meta.description!,
      tags: (meta.tags as string[] | undefined) ?? [],
      published: meta.published !== false,
      cover: meta.cover,
      slug,
      url: `/posts/${slug}`,
      body: content,
      readingTime: readingTime(content)
    };
  } catch {
    return null;
  }
}
