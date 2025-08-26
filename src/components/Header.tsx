import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="border-b border-border/70 sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-lg tracking-tight hover:opacity-90">
          <span className="text-accent">C:\</span>Users\{site.name}&gt; whoami_
        </Link>
        <nav className="flex gap-5 text-sm text-muted">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-text transition-colors">{n.name}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
