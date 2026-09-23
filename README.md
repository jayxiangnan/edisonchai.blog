# EdisonChai Blog

一个使用 Next.js、TypeScript、Tailwind CSS 与本地 MDX 构建的个人独立博客。

## 开始

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。生产环境使用 `npm run build && npm run start`。

## 写文章

在 `content/posts/` 新建 `.mdx` 文件。Frontmatter 必填字段：

```yaml
title: 文章标题
slug: url-slug
description: 文章摘要
date: 2026-09-22
category: 技术
tags: [标签]
featured: false
draft: false
readingTime: 5
```

`draft: true` 的内容不会出现在站点、RSS 或 sitemap 中。运行 `npm run validate:content` 可校验所有已发布文章的元数据。

## 个性化配置

- 站点名称、个人介绍与外部链接：`src/components/site.tsx`、`src/app/page.tsx`
- 域名与默认 SEO：`src/app/layout.tsx`、`src/app/sitemap.ts`
- 项目数据：`src/lib/projects.ts`
- 文章内容：`content/posts/*.mdx`

部署前，把代码中的 `https://edisonchai.com` 改为你的正式域名；随后导入 Git 仓库到 Vercel 即可。当前版本没有运行时环境变量。内容仓库已独立在 `src/lib/content.ts`，后续可以保持同一接口替换为 Notion、Supabase 或其他 CMS。

## 质量检查

```bash
npm run lint
npm run typecheck
npm run validate:content
npm run build
```
