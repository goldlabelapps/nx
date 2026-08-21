---
order: 9050
title: Tech Stack Overview
description: Engineering-level tech stack overview
slug: /docs/engineering/techstack-overview
icon: docs
tags: docs
---
NX repository documentation

> Tags: docs, engineering, techstack

# Tech Stack Overview

This monorepo uses a modern web stack centered on Next.js, TypeScript, and Turbo.

#### Core
- Node.js and pnpm for package management and workspace orchestration
- TypeScript for application and shared library code
- Turbo for monorepo task orchestration and build pipelines

#### App Layer
- Next.js for the main web application in apps/nx
- React and React DOM for UI rendering
- CSS and component-based styling support for the app experience

#### Data and Services
- Firebase for backend and app services integration
- Gray-matter and markdown-driven content handling for CMS-style content

#### Tooling
- Jest for unit and integration testing
- ESLint for code quality
- Vercel deployment configuration for the web app

#### Notes
- This overview is intentionally concise and easy to update as the stack evolves.
