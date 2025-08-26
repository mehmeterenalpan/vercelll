import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/70 mt-16">
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-muted flex flex-col sm:flex-row gap-4 justify-between">
        <p>© {new Date().getFullYear()} {site.author}. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href={site.links.github} target="_blank">GitHub</Link>
          <Link href={site.links.x} target="_blank">X/Twitter</Link>
          <Link href={site.links.email}>Email</Link>
          <Link href="/feed.xml">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
