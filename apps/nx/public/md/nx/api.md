---
order: 5
title: API
description: Overview of the app's routes, data loaders, and interfaces.
icon: Terminal
tags: api, nextjs, reference
image: nx
---

# API Reference

This template is primarily a static, config-driven front end. It exposes a small set of data loaders instead of a REST API.

## Markdown Guide Loader (`src/lib/markdown.ts`)

* `getAllGuides()` — returns metadata for every guide in `public/md`, sorted by `order`.
* `getGuideBySlug(slug)` — returns a single guide's metadata and content.
* `getGuideStaticSlugs()` — returns slugs for Next.js static generation.

## Video Data Loader (`src/lib/videos.ts`)

* `getAllVideos()` — returns all configured video items.
* `getVideoBySlug(slug)` — returns a single video by id or slug.
* `getVideoStaticSlugs()` — returns slugs for Next.js static generation.

## Adding a New Route

New routes follow the Next.js App Router convention under `src/app`. Dynamic routes (e.g. `[slug]/page.tsx`) use `generateStaticParams` and `generateMetadata` to pre-render pages from config or markdown data.
