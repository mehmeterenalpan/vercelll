# segv0 — Security Research & Write-ups

Dark, minimal blog inspired by clean security blogs. Built with **Next.js 14 + Contentlayer + TailwindCSS**.  
Deploy-first on **Vercel**. Markdown/MDX posts live under `content/posts`.

## ✨ Features

- Static export (`next export`) – zero backend, CDN-friendly
- MDX posts with code highlighting (rehype-pretty-code)
- Tags, write-ups section, search (Fuse.js, static index)
- RSS feed (`/feed.xml`) and sitemap (`/sitemap.xml`)
- Minimal black theme, terminal-inspired header
- SEO meta + OpenGraph defaults

## 🚀 Quickstart

```bash
pnpm i   # or npm i / yarn
pnpm dev
```

Add posts in `content/posts/*.mdx` using frontmatter:

```md
---
title: "My Post"
date: "2025-08-01"
description: "Short summary"
tags: ["writeup","web"]
published: true
---
MDX content here
```

## 🏗️ Build & Export

```bash
pnpm build
```

This generates `out/` (static site) and `out/search.json`. For Vercel:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Node.js Version**: 18 or 20
- (Optional) Add a custom domain like `segv0.pw` after first deploy.

## 🔧 Customize

- `src/lib/site.ts` → name, URLs, nav, social links
- `tailwind.config.ts` → colors
- `public/favicon.svg` → change the logo glyph
- `/about` page content in `src/app/about/page.tsx`

## 📡 RSS, robots, sitemap

- RSS: `/feed.xml`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## 📝 License

MIT — use it freely.
