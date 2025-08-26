"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

type Item = { title: string; description: string; url: string; tags: string[]; date: string };

export default function Search() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    fetch("/search.json").then(r => r.json()).then(setData).catch(() => {});
  }, []);
  const fuse = useMemo(() => new Fuse(data, { includeScore: true, keys: ["title","description","tags"] }), [data]);
  const hits = q.length ? fuse.search(q).slice(0, 8).map(h => h.item) : [];
  return (
    <div className="relative">
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search posts..."
        className="w-full rounded-xl border border-border bg-card/40 px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40"
      />
      {q && hits.length > 0 && (
        <div className="absolute mt-2 w-full rounded-xl border border-border bg-card/80 backdrop-blur p-2 space-y-2 z-40">
          {hits.map((it) => (
            <Link
              key={it.url}
              href={{ pathname: it.url }}   // <— burada
              className="block rounded-lg p-2 hover:bg-border/30"
            >
              <div className="font-medium">{it.title}</div>
              <div className="text-xs text-muted">{it.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
