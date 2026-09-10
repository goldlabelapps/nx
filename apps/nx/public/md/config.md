---
order: 2
title: Config
description: Configure branding, navigation, and content through the config layer.
icon: Settings
tags: configuration, admin, setup
image: nx
---

Some site content is driven by the configuration modules in `src/config`. Rebranding or restructuring a new app should only require editing these files.

## Config Modules

| File | Purpose |
| :--- | :--- |
| `brand.config.ts` | Brand name, logo, and logo context menu labels |
| `metadata.config.ts` | Page title, description, Open Graph, and theme color |
| `pwa.config.ts` | Progressive Web App manifest fields and icons |
| `navigation.config.ts` | Header links, dropdowns, and CTAs |
| `hero.config.ts` | Homepage hero headline, CTAs, and particle field |
| `statement.config.ts` | Statement section headline and floating icons |
| `features.config.ts` | Feature explorer tabs and code/terminal previews |
| `videos.config.ts` | Video showcase items and metadata |
| `useCases.config.ts` | Use case cards |
| `solutions.config.ts` | Pricing/solutions tier cards |
| `blogs.config.ts` | Blog section posts |
| `authCta.config.ts` | Download/signup call-to-action banner |
| `footer.config.ts` | Footer columns, social links, and copyright |

## Environment Variables

Environment-specific values (API keys, external URLs) should be added to a `.env.local` file and referenced from the relevant config module rather than hardcoded in components.

## Theming

Colors and design tokens are managed through the shared `@goldlabelapps/theme` package and Tailwind CSS. Update `globals.css` for global style overrides.
