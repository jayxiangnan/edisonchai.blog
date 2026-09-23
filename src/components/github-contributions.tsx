import { getGitHubContributions } from "@/lib/github-contributions";
import { site } from "@/lib/site";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "short",
  timeZone: "UTC",
});

function dateFromIso(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function startOfWeek(date: Date) {
  const sunday = new Date(date);
  sunday.setUTCDate(sunday.getUTCDate() - sunday.getUTCDay());
  return sunday;
}

export async function GitHubContributions() {
  const calendar = await getGitHubContributions();
  if (!calendar) return null;

  const startDate = dateFromIso(calendar.startDate);
  const firstSunday = startOfWeek(startDate);
  const weekIndex = (date: Date) =>
    Math.floor((date.getTime() - firstSunday.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const monthLabels = calendar.days.reduce<Array<{ label: string; column: number }>>(
    (labels, day, index) => {
      const date = dateFromIso(day.date);
      const previous = index === 0 ? null : dateFromIso(calendar.days[index - 1].date);
      if (index !== 0 && previous?.getUTCMonth() === date.getUTCMonth()) return labels;

      const previousColumn = labels.at(-1)?.column ?? 0;
      labels.push({
        label: monthFormatter.format(date),
        // A month can begin during the same Sunday–Saturday column as the previous one.
        // Shift only the label one column to avoid overlapping text; contribution days stay exact.
        column: Math.max(weekIndex(date) + 1, previousColumn + 1),
      });
      return labels;
    },
    [],
  );
  const period = `${dateFormatter.format(startDate)}至${dateFormatter.format(dateFromIso(calendar.endDate))}`;
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
          <div className="contribution-chart">
            <div className="contribution-weekdays" aria-hidden="true">
              <span>周一</span>
              <span>周三</span>
              <span>周五</span>
            </div>
            <div className="contribution-calendar">
              <div className="contribution-months" aria-hidden="true">
                {monthLabels.map((month) => (
                  <span
                    key={`${month.label}-${month.column}`}
                    style={{ gridColumnStart: month.column }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>
              <ol className="contribution-grid">
                {calendar.days.map((day) => {
                  const date = dateFromIso(day.date);
                  return (
                    <li
                      className={`contribution-day level-${day.level}`}
                      key={day.date}
                      style={{
                        gridColumnStart: weekIndex(date) + 1,
                        gridRowStart: date.getUTCDay() + 1,
                      }}
                      aria-label={`${dateFormatter.format(date)}，${day.count} 次贡献`}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
        <figcaption className="contribution-footer" id="github-activity-summary">
          <span className="contribution-summary">{summary}</span>
          <span className="contribution-legend" aria-label="贡献数量由少到多">
            <span>少</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <i className={`contribution-day level-${level}`} key={level} aria-hidden="true" />
            ))}
            <span>多</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
