export type Project = {
  title: string;
  slug: string;
  summary: string;
  /** Existing published description. Keep this when richer verified details are unavailable. */
  detail: string;
  details?: {
    background?: string;
    problem?: string;
    approach?: string;
    contribution?: string;
    status?: "持续维护" | "已完成" | "实验中" | "已归档";
  };
  type: "产品" | "开源" | "实验" | "写作";
  technologies: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  articleUrl?: string;
  featured: boolean;
  order: number;
};
export const projects: Project[] = [
  {
    title: "微光清单",
    slug: "glow-list",
    summary: "一个让待办事项回到日常节奏里的轻量工具。",
    detail: "从收集到完成，减少标签与提醒的噪音，只保留今天真正重要的事。",
    type: "产品",
    technologies: ["Next.js", "SQLite"],
    featured: true,
    order: 1,
  },
  {
    title: "纸上花园",
    slug: "paper-garden",
    summary: "为长文与摘录建立的本地优先阅读笔记。",
    detail: "探索文件系统、全文检索与私有知识库之间更松弛的关系。",
    type: "开源",
    technologies: ["Rust", "Tauri"],
    featured: true,
    order: 2,
  },
  {
    title: "慢速网页",
    slug: "slow-web",
    summary: "关于网页加载、注意力与速度感的一次交互实验。",
    detail: "用极少的界面元素，记录等待、阅读与停留如何影响线上体验。",
    type: "实验",
    technologies: ["TypeScript", "Web Audio"],
    featured: true,
    order: 3,
  },
  {
    title: "给未来的开发者",
    slug: "letters",
    summary: "一组写给初入行业朋友的技术与成长通信。",
    detail: "从具体的工作困惑出发，谈技术判断、协作和持续学习。",
    type: "写作",
    technologies: ["MDX"],
    articleUrl: "/blog",
    featured: true,
    order: 4,
  },
];
