import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";
import { article, articles } from "@/lib/content";
import { CopyButton } from "@/components/copy-button";

export function generateStaticParams() {
  return articles().map((x) => ({ slug: x.slug }));
}
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const p = article(slug);
    return p
      ? {
          title: p.title,
          description: p.description,
          openGraph: { type: "article", publishedTime: p.date },
        }
      : {};
  });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function headingText(children: ReactNode) {
  return Array.isArray(children) ? children.join("") : String(children);
}
function CodeBlock({ children }: { children: ReactNode }) {
  const child = isValidElement<{ children?: ReactNode }>(children) ? children : undefined;
  const text = child ? headingText(child.props.children) : headingText(children);
  return (
    <pre>
      <CopyButton text={text} />
      {children}
    </pre>
  );
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const p = article((await params).slug);
  if (!p) notFound();
  const headings = [...p.body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1]);
  const { content } = await compileMDX({
    source: p.body,
    options: { parseFrontmatter: false },
    components: {
      h2: ({ children }) => <h2 id={slugify(headingText(children))}>{children}</h2>,
      pre: CodeBlock,
    },
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { "@type": "Person", name: "Edison" },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="article-head reading">
          <div className="meta">
            {p.category} · {p.date} · {p.readingTime} 分钟阅读
          </div>
          <h1>{p.title}</h1>
          <p className="description">{p.description}</p>
        </header>
        <hr className="rule" />
        <div className="article-layout">
          <div className="prose">{content}</div>
          <aside className="toc">
            <strong>目录</strong>
            {headings.map((heading) => (
              <a key={heading} href={`#${slugify(heading)}`}>
                {heading}
              </a>
            ))}
          </aside>
        </div>
      </article>
    </>
  );
}
