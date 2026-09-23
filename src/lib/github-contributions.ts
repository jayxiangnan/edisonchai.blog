import "server-only";
import { site } from "@/lib/site";

export const githubContributionsCacheTag = "github-contributions";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionCalendar = {
  days: ContributionDay[];
  totalContributions: number;
  activeDays: number;
  startDate: string;
  endDate: string;
};

type GitHubContributionLevel =
  "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

type GitHubResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              date: string;
              contributionLevel: GitHubContributionLevel;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message?: string }>;
};

const levelMap: Record<GitHubContributionLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const query = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function dateRange() {
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364);

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    from: `${start.toISOString().slice(0, 10)}T00:00:00Z`,
    to: `${end.toISOString().slice(0, 10)}T23:59:59Z`,
  };
}

/** Reads GitHub's GraphQL API on the server. Tokens never enter client code. */
export async function getGitHubContributions(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const range = dateRange();

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login: site.githubUsername,
          from: range.from,
          to: range.to,
        },
      }),
      next: {
        revalidate: site.githubContributionsRevalidate,
        tags: [githubContributionsCacheTag],
      },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as GitHubResponse;
    const calendar = payload.data?.user?.contributionsCollection.contributionCalendar;
    if (payload.errors?.length || !calendar) return null;

    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel],
      })),
    );

    if (!days.length) return null;

    return {
      days,
      totalContributions: calendar.totalContributions,
      activeDays: days.filter((day) => day.count > 0).length,
      startDate: range.startDate,
      endDate: range.endDate,
    };
  } catch {
    return null;
  }
}
