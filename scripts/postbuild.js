import fs from "node:fs";
import path from "node:path";
import { allPosts } from "../.contentlayer/generated/index.mjs";
const data = allPosts.filter(p => p.published).map(p => ({
  title: p.title, description: p.description, url: p.url, tags: p.tags ?? [], date: p.date
}));
const outDir = path.join(process.cwd(), "out");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "search.json"), JSON.stringify(data, null, 2));
console.log("Wrote out/search.json");
