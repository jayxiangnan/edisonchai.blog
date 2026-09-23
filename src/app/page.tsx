import Link from "next/link";
import { GitHubContributions } from "@/components/github-contributions";

// Keep the homepage eligible for regeneration when GitHub credentials are added later.
export const revalidate = 43_200;

export default function Home() {
  return (
    <div className="home-layout">
      <section className="home-identity" aria-labelledby="home-identity-heading">
        <p className="eyebrow">关于我</p>
        <h1 id="home-identity-heading">
          我是 Edison，写代码，也写下那些在工作与生活里慢慢变清楚的事。
        </h1>
        <div className="home-identity-details">
          <p>
            我在银川，关心产品如何变得更有用，也关心工具是否为人留出了呼吸的空间。比起追逐每一个新名词，我更愿意在真实的问题前多停留一会儿。
          </p>
          <p>
            这里会有软件开发、产品设计、学习方法与平常生活。它们看似分散，却都和同一个问题有关：如何更清醒地生活与创造。
          </p>
        </div>
        <nav className="identity-links" aria-label="首页内容入口">
          <Link href="/blog">浏览 Blog →</Link>
          <Link href="/projects">查看 Work →</Link>
        </nav>
      </section>
      <GitHubContributions />
    </div>
  );
}
