import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-title reading">
      <h1>这里还没有内容。</h1>
      <p>或许它已经移动，也或许我还没来得及写下它。</p>
      <p>
        <Link className="text-link" href="/">
          返回首页 →
        </Link>
        　
        <Link className="text-link" href="/blog">
          浏览文章 →
        </Link>
      </p>
    </section>
  );
}
