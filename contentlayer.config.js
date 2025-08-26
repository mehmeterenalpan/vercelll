// contentlayer.config.js (CommonJS)
const { defineDocumentType, makeSource } = require("contentlayer/source-files");
const rehypePrettyCode = require("rehype-pretty-code");
const remarkGfm = require("remark-gfm");
const readingTime = require("reading-time");

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    published: { type: "boolean", default: true },
    cover: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`
    },
    // ---- NEW: readingTime for UI (text, minutes, words) ----
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    }
  }
}));

module.exports = makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]]
  }
});
