请以以下Prompt提示，为我构建博客系统

```text
请为我构建一个可部署的“个人独立博客系统”，视觉与信息架构参考 https://www.timwehrle.de/ 的克制、轻量、编辑化风格，但必须使用原创品牌、原创文案、原创图片和原创代码，不能复制参考站的任何名称、照片、文章内容或 CSS，实现效果需要保持原站点的简洁。

## 项目定位

博客名：EdisonChai
作者：Edison
一句话介绍：记录开发、设计、思考与日常
语言：中文为主，预留中英文切换能力
受众：关注技术、产品、设计、个人成长的人
气质关键词：安静、理性、轻盈、可信、极简、编辑感、长期主义。

## 技术选型

使用 Next.js 最新稳定版 + TypeScript + App Router + Tailwind CSS。
内容层使用 MDX 文件优先；同时抽象 Content Repository 接口，以便后续无痛换成 Notion、Supabase、PostgreSQL 或 Headless CMS。
使用 Zod 校验文章 frontmatter。
使用 next/image、next/font，注重 Core Web Vitals、SEO、无障碍与静态生成。
不要引入沉重 UI 框架；图标使用 Lucide，保持细线、克制。
提供完整 README：安装、运行、写作、发布、环境变量、部署到 Vercel 的说明。

## 视觉设计规范

整体不是 SaaS 面板，也不是营销落地页，不要渐变大标题、玻璃拟态、悬浮卡片瀑布流、圆角胶囊标签、夸张阴影或复杂动效。

- 页面底色：纯白 #FFFFFF。
- 主文本：接近黑色 #151515；辅助文字为中性灰。
- 分隔线：极浅灰 #EAEAEA，使用细横线建立节奏。
- 主容器：max-width 760px 到 880px；左右留白充分，阅读宽度约 680px。
- 字体：中文优先使用 Noto Serif SC / Source Han Serif 或高质量系统衬线字体；UI、导航、元信息用 Inter 或系统无衬线字体。
- 标题有编辑感、字号明确；正文舒展，行高 1.8 以上。
- 不要默认卡片边框。内容用留白、横线、文字层级组织。
- 图片比例自然，圆角极小或无圆角；不加色彩蒙层。
- 链接采用清晰但低调的下划线 / hover 颜色变化。
- 动效只用于 hover、导航展开、页面淡入；遵守 prefers-reduced-motion。
- 手机端保留相同阅读节奏；导航折叠但保持简洁，禁止横向溢出。

## 信息架构与页面

### 1. 首页 `/`

首屏为极简顶部导航：
- 左侧：文字 Logo“EdisonChai”
- 右侧：文章、关于、项目、RSS、GitHub / 社交链接
- 移动端使用极简菜单按钮。

首页按以下顺序组织：

1. About / 自我介绍
   - 一级标题“你好，我是 Edison”
   - 3～4 条简洁介绍，例如所在地、职业方向、写作主题与当前关注。
   - 使用横线分隔，不使用头像大图或营销式 CTA。

2. Projects / 项目
   - 展示 3～6 个项目。
   - 每项包含：项目名、2～3 行简介、项目类型与技术栈、GitHub / 在线访问 / 文章链接。
   - 采用纵向清单而非卡片网格；项目之间使用留白和细分割线。

3. Latest posts / 最新文章
   - 标题右侧放 RSS 链接。
   - 展示最新 3 篇文章：分类、文章标题、两行摘要、发布日期。
   - 末尾有“查看全部文章 →”链接。

4. Footer
   - 联系邮箱、GitHub、LinkedIn / X / 小红书等社交链接。
   - 版权年份、隐私政策和备案 / 站点说明（按需）。
   - 与正文用横线区隔。

### 2. 文章列表页 `/blog`

- 顶部保留全局导航。
- 可选横幅图片：使用原创、低饱和的自然 / 城市 / 抽象摄影作品；大幅但不过分抢眼，图片下标注摄影来源。
- 标题：“写下技术、学习与生活中的长期思考”
- 分类过滤器：全部、技术、产品、设计、学习、生活等。桌面端横排文字链接，移动端可横向滚动。
- 文章列表按时间倒序，分页或“加载更多”。
- 每条文章包含：
  - 分类 · 日期
  - 标题
  - 约 2～3 行摘要
  - “阅读全文 →”
- 列表保持编辑排版和大留白，不能做成信息流卡片。

### 3. 文章详情页 `/blog/[slug]`

文章头部：
- 分类、发布日期、阅读时长
- H1
- 一句可选摘要
- 可选文章封面图（原创或来自可商用图库，并保留来源信息）

正文能力：
- 优质 Markdown / MDX 排版：h2、h3、段落、引用、代码块、图片、脚注、表格、列表。
- 代码块带语言标签、复制按钮和浅色主题语法高亮。
- 长文右侧目录（桌面端 sticky），移动端可折叠。
- 文末展示标签、上一篇 / 下一篇、相关文章 3 篇、订阅 RSS 的轻量引导。
- 不加评论系统第一版，但预留 Giscus / Cusdis 接口。
- 文章使用 JSON-LD `BlogPosting` 结构化数据。

### 4. 关于页 `/about`

展示作者简介、当前在做什么、写作主题、工具 / 书单 / 联系方式；沿用首页极简版式。

### 5. 项目页 `/projects`

完整项目列表，支持按“产品 / 开源 / 实验 / 写作”筛选，每项可展开查看背景、技术、链接和截图。

### 6. 系统页

实现 `/rss.xml`、`/sitemap.xml`、`/robots.txt`、`/404`。
404 页保持克制，只提供返回首页和文章页链接。

## 内容模型

Article frontmatter：

---
title: string
slug: string
description: string
date: YYYY-MM-DD
updated?: YYYY-MM-DD
category: string
tags: string[]
cover?: string
coverAlt?: string
coverCredit?: string
featured: boolean
draft: boolean
readingTime: number
---

Project 数据模型：

{
  title,
  slug,
  summary,
  type,
  technologies: string[],
  repositoryUrl?,
  demoUrl?,
  articleUrl?,
  cover?,
  featured,
  order
}

请提供至少 8 篇中文示例文章和 4 个示例项目；示例内容要可信、有思想，但不要使用 Lorem Ipsum。

## 后台与写作体验

第一阶段不做复杂后台，采用 `/content/posts/*.mdx` 本地 MDX 写作。
实现：
- 草稿不进入生产文章列表；
- 自动计算阅读时长；
- 自动生成 RSS、sitemap、文章标签页；
- 开发环境提供文章元数据校验；
- 所有外链自动添加安全属性；
- 图片必须有 alt 文本；
- 后续可接入 Decap CMS / Notion / Supabase，但当前不引入不必要依赖。

## SEO、性能与可访问性

- 每个页面独立生成 title、description、canonical、Open Graph 和 Twitter Card。
- 首页为 Person / WebSite，文章页为 BlogPosting JSON-LD。
- 语义化 HTML；键盘可访问；明确焦点样式；颜色对比度达标。
- 优先静态生成与 ISR。
- 使用优化后的本地图片或远程图片白名单。
- 目标 Lighthouse：Performance、Accessibility、Best Practices、SEO 均不低于 95。

## 交付要求

1. 先展示目录结构、设计 token、路由和组件拆分方案。
2. 再实现完整可运行项目，禁止只做静态首页。
3. 每个导航、分类筛选、文章链接、分页 / 加载更多、代码复制等核心交互都必须可用。
4. 在桌面 1440px、平板 768px、手机 390px 下检查布局。
5. 最终运行 lint、typecheck、build，并修复所有错误。
6. 输出 README 和用于替换个人资料、社交链接、内容来源的清晰配置说明。
```
