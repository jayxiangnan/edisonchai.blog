import { articles, categories } from "@/lib/content";
import { BlogExplorer } from "@/components/explorers";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "文章",
  description: "写下技术、学习与生活中的长期思考",
};
export default function Blog() {
  return (
    <>
      <header className="page-title reading">
        <h1>文章</h1>
        <p>写下技术、学习与生活中的长期思考。</p>
      </header>
      <BlogExplorer items={articles()} categories={categories()} />
    </>
  );
}
