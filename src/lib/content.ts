import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
const dir = path.join(process.cwd(), "content/posts");
const schema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean(),
  draft: z.boolean(),
  readingTime: z.number(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  coverCredit: z.string().optional(),
});
export type Article = z.infer<typeof schema> & { body: string };
export function articles(): Article[] {
  return fs
    .readdirSync(dir)
    .filter((x) => x.endsWith(".mdx"))
    .map((file) => {
      const raw = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      const data = {
        ...raw.data,
        date:
          raw.data.date instanceof Date ? raw.data.date.toISOString().slice(0, 10) : raw.data.date,
        updated:
          raw.data.updated instanceof Date
            ? raw.data.updated.toISOString().slice(0, 10)
            : raw.data.updated,
      };
      return { ...schema.parse(data), body: raw.content };
    })
    .filter((x) => !x.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
export function article(slug: string) {
  return articles().find((x) => x.slug === slug);
}
export function categories() {
  return ["全部", ...Array.from(new Set(articles().map((x) => x.category)))];
}
export function reading(text: string) {
  return Math.max(1, Math.ceil(text.replace(/[#*`\n]/g, " ").split(/\s+/).length / 220));
}
