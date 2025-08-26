import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
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
    }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    // JS dosyasında olduğu için tip uyuşmazlığı kalmaz
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]]
  }
});
