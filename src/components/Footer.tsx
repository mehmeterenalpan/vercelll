// import Link from "next/link";  // <-- kaldır
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border/70 mt-16">
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-muted flex flex-col sm:flex-row gap-4 justify-between">
        <p>© {new Date().getFullYear()} {site.author}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.links.x} target="_blank" rel="noreferrer">X/Twitter</a>
          <a href={site.links.email}>Email</a>
          <a href="/feed.xml">RSS</a> {/* statik dosya olduğu için <a> kullan */}
        </div>
      </div>
    </footer>
  );
}
