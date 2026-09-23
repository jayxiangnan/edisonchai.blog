import Link from "next/link";
import { GitHubContributions } from "@/components/github-contributions";
import { articles } from "@/lib/content";
import { projects } from "@/lib/projects";

// Keep the homepage eligible for regeneration when GitHub credentials are added later.
export const revalidate = 43_200;

export default function Home() {
  const posts = articles().slice(0, 3);
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((first, second) => first.order - second.order)
    .slice(0, 4);
  return (
    <div className="home-layout">
      <GitHubContributions />
      <section className="home-section posts" aria-labelledby="latest-posts-heading">
        <div className="section-top">
          <h2 className="section-heading" id="latest-posts-heading">
            最新文章
          </h2>
          <Link href="/blog" className="text-link" aria-label="查看全部文章">
            查看全部文章 →
          </Link>
        </div>
        <div className="home-list" role="list">
          {posts.map((p) => (
            <article className="home-row home-post" key={p.slug} role="listitem">
              <div className="meta">
                {p.category} · {p.date}
              </div>
              <h3>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              <p>{p.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-section" aria-labelledby="projects-heading">
        <div className="section-top">
          <h2 className="section-heading" id="projects-heading">
            项目
          </h2>
          <Link href="/projects" className="text-link" aria-label="查看全部项目">
            查看全部 →
          </Link>
        </div>
        <div className="home-list" role="list">
          {featuredProjects.map((p) => (
            <article className="home-row" key={p.slug} role="listitem">
              <h3>
                <Link href={`/projects#${p.slug}`}>{p.title}</Link>
              </h3>
              <p>{p.summary}</p>
              <div className="meta">
                {p.type} · {p.technologies.join("、")}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
