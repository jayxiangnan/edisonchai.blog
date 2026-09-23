import { articles } from "@/lib/content";
export function GET() {
  const items = articles()
    .map(
      (p) =>
        `<item><title><![CDATA[${p.title}]]></title><link>https://edisonchai.com/blog/${p.slug}</link><description><![CDATA[${p.description}]]></description><pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0"?><rss version="2.0"><channel><title>EdisonChai</title><link>https://edisonchai.com</link><description>记录开发、设计、思考与日常</description>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
