"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "@/lib/content";
import { projects } from "@/lib/projects";

const projectDetailLabels = {
  background: "项目背景",
  problem: "解决的问题",
  approach: "方案与技术",
  contribution: "我的贡献",
} as const;
export function BlogExplorer({ items, categories }: { items: Article[]; categories: string[] }) {
  const [category, setCategory] = useState("全部");
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () => (category === "全部" ? items : items.filter((i) => i.category === category)),
    [category, items],
  );
  const shown = filtered.slice((page - 1) * 5, page * 5);
  const pages = Math.ceil(filtered.length / 5);
  return (
    <>
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter ${c === category ? "active" : ""}`}
            aria-pressed={c === category}
            onClick={() => {
              setCategory(c);
              setPage(1);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="article-list posts">
        {shown.map((p) => (
          <article className="item" key={p.slug}>
            <div className="meta">
              {p.category} · {p.date} · {p.readingTime} 分钟阅读
            </div>
            <h3>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>{p.description}</p>
            <Link className="text-link" href={`/blog/${p.slug}`}>
              阅读全文 →
            </Link>
          </article>
        ))}
      </div>
      {pages > 1 && (
        <div className="pagination" aria-label="分页">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              aria-current={page === i + 1 ? "page" : undefined}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
export function ProjectExplorer() {
  const [type, setType] = useState("全部");
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = type === "全部" ? projects : projects.filter((p) => p.type === type);
  return (
    <>
      <div className="project-controls">
        {["全部", "产品", "开源", "实验", "写作"].map((x) => (
          <button
            onClick={() => {
              setType(x);
              setExpanded(null);
            }}
            className={type === x ? "active" : ""}
            aria-pressed={type === x}
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
      {items.map((p) => (
        <article id={p.slug} className="item" key={p.slug}>
          <div className="meta">
            {p.type} · {p.technologies.join("、")}
          </div>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
          <button
            className="text-link"
            aria-expanded={expanded === p.slug}
            aria-controls={`${p.slug}-detail`}
            onClick={() => setExpanded(expanded === p.slug ? null : p.slug)}
          >
            {expanded === p.slug ? "收起详情 ↑" : "查看详情 →"}
          </button>
          {expanded === p.slug && (
            <div className="project-detail" id={`${p.slug}-detail`}>
              {p.details ? (
                <dl className="project-details-list">
                  {(
                    Object.keys(projectDetailLabels) as Array<keyof typeof projectDetailLabels>
                  ).map(
                    (key) =>
                      p.details?.[key] && (
                        <div key={key}>
                          <dt>{projectDetailLabels[key]}</dt>
                          <dd>{p.details[key]}</dd>
                        </div>
                      ),
                  )}
                  {p.details.status && (
                    <div>
                      <dt>当前状态</dt>
                      <dd>{p.details.status}</dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p>{p.detail}</p>
              )}
              {(p.repositoryUrl || p.demoUrl || p.articleUrl) && (
                <p className="project-links">
                  {p.repositoryUrl && (
                    <a href={p.repositoryUrl} target="_blank" rel="noreferrer">
                      源码 ↗
                    </a>
                  )}
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noreferrer">
                      项目链接 ↗
                    </a>
                  )}
                  {p.articleUrl && <Link href={p.articleUrl}>相关文章 →</Link>}
                </p>
              )}
            </div>
          )}
        </article>
      ))}
    </>
  );
}
