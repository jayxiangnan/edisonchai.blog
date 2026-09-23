import { getGitHubContributions } from "@/lib/github-contributions";
import { site } from "@/lib/site";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export async function GitHubContributions() {
  const calendar = await getGitHubContributions();
  if (!calendar) return null;

  const period = `${dateFormatter.format(new Date(`${calendar.startDate}T00:00:00Z`))}至${dateFormatter.format(new Date(`${calendar.endDate}T00:00:00Z`))}`;
  const summary = `过去一年共 ${calendar.totalContributions} 次贡献，活跃 ${calendar.activeDays} 天。`;

  return (
    <section className="contributions" aria-labelledby="github-activity-heading">
      <div className="section-top">
        <h2 className="section-heading" id="github-activity-heading">
          GitHub 活动
        </h2>
        <a
          className="text-link"
          href={site.github}
          target="_blank"
          rel="noreferrer"
          aria-label="在 GitHub 查看 jayxiangnan 的主页"
        >
          GitHub ↗
        </a>
      </div>
      <figure aria-describedby="github-activity-summary">
        <div
          className="contribution-scroll"
          tabIndex={0}
          aria-label={`${period}的 GitHub 贡献热力图`}
        >
          <ol className="contribution-grid">
            {calendar.days.map((day) => (
              <li
                className={`contribution-day level-${day.level}`}
                key={day.date}
                aria-label={`${dateFormatter.format(new Date(`${day.date}T00:00:00Z`))}，${day.count} 次贡献`}
              />
            ))}
          </ol>
        </div>
        <figcaption className="contribution-summary" id="github-activity-summary">
          {summary}
        </figcaption>
      </figure>
    </section>
  );
}
