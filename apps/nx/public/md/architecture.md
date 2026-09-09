---
order: 4
title: Architecture
description: Explore the modular design system and package structure.
icon: Zap
tags: architecture, guide
image: nx
---

This template follows a modular, config-driven architecture designed for reuse across projects.

## Folder Structure

```
src/
  app/         Next.js App Router routes and pages
  components/  Reusable UI organized by domain (hero, navigation, showcase, ui, ...)
  config/      Content and branding configuration modules
  context/     React context providers (e.g. ThemeContext)
  lib/         Shared utilities (markdown parsing, video data, etc.)
```

## Design System

Shared, cross-app primitives (buttons, cards, tokens) live in the `@goldlabelapps/theme` workspace package and are consumed here via Tailwind CSS classes and component props.

## Data Flow

1. Config modules in `src/config` define all content.
2. `src/config/index.ts` composes everything into a single `siteConfig` object.
3. Components import `siteConfig` and render sections declaratively, with no content hardcoded in JSX.

## Extending the Template

To add a new page section: create a component under `src/components`, add a matching config module under `src/config`, export it from `src/config/index.ts`, and render the component where needed.
