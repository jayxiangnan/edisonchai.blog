import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/blog", "/about", "/projects"]
    .map((url) => ({ url: `https://edisonchai.com${url}`, lastModified: new Date() }))
    .concat(
      articles().map((p) => ({
        url: `https://edisonchai.com/blog/${p.slug}`,
        lastModified: new Date(p.updated || p.date),
      })),
    );
}
