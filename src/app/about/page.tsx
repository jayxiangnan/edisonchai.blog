import type { Metadata } from "next";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "关于" };
export default function About() {
  return (
    <div className="reading">
      <header className="page-title">
        <h1>关于我</h1>
        <p>我是 Edison，写代码，也写下那些在工作与生活里慢慢变清楚的事。</p>
      </header>
      <hr className="rule" />
      <section className="prose">
        <h2>此刻</h2>
        <p>
          我在杭州，关心产品如何变得更有用，也关心工具是否为人留出了呼吸的空间。比起追逐每一个新名词，我更愿意在真实的问题前多停留一会儿。
        </p>
        <h2>写什么</h2>
        <p>
          这里会有软件开发、产品设计、学习方法与平常生活。它们看似分散，却都和同一个问题有关：如何更清醒地生活与创造。
        </p>
        <h2>常用的东西</h2>
        <p>一台电脑、一个文本编辑器、纸质笔记本、散步时不听播客的耳机。</p>
        <h2>联系</h2>
        <p>
          欢迎写信到 <a href={`mailto:${site.email}`}>{site.email}</a>。我会认真读完。
        </p>
      </section>
    </div>
  );
}
