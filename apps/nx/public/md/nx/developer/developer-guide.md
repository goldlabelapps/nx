---
order: 9041
title: Developer Guide
description: NX repository documentation
icon: docs
tags: engineering, developer-guide, workflow
image: developer
---

## Purpose

This guide is the practical handover for developers building on NX°.

It explains:

- where the product code lives
- how the workspace is structured
- how apps, packages, and shared runtime layers fit together
- how to validate changes before shipping

## The 5 Ws for a Developer

### What am I looking at?

A Turborepo-managed monorepo with Next.js applications and shared packages:

- `apps/nx` -> config-driven Next.js application
- `packages/theme` -> reusable UI, tokens, and component primitives
- `packages/uberedux` -> shared state and provider patterns
- `packages/cli` -> shared CLI toolchain for workspaces
- `packages/saas` -> SaaS auth guards, session verification, and routing zones

### Why is it organized this way?

To keep shared product logic, design systems, and delivery infrastructure reusable while preserving clear boundaries between customer-facing surfaces and internal tools.

### Who works in which area?

- reusable UI and theme: `packages/theme`
- shared state/runtime patterns: `packages/uberedux`

### Where are the critical boundaries?

- customer-facing apps vs admin app
- shared runtime layers vs app-specific features
- package exports vs app-level composition
- API routes vs client-side experience layers

### When should I care about each layer?

- cross-app UI primitives: `packages/theme`
- shared state and runtime plumbing: `packages/uberedux`

## Repository Map

### Root

- `package.json` -> workspace scripts and versions
- `pnpm-workspace.yaml` -> workspace membership
- `turbo.json` -> task orchestration
- `apps/` -> deployable product surfaces
- `packages/` -> shared product infrastructure
- `docs/` -> product, delivery, and technical documentation

### NX App: `apps/nx`

Main roots:

- `src/` -> Next.js 16 App Router application
- `public/` -> static assets, icons, markdown documentation

Common commands:

- `pnpm --filter nx dev`
- `pnpm --filter nx test`
- `pnpm dev nx`

### Shared Packages

#### `packages/theme`

Purpose:

- design tokens
- reusable components
- stories and visual references
- UI foundations for the wider platform

#### `packages/uberedux`

Purpose:

- shared state hooks and provider patterns
- app-wide state composition
- scalable Redux/Uberedux integration

## Architecture Model

### Product Composition

The platform is designed to support multiple product surfaces from one shared codebase:

- a public experience for audiences and customers
- shared UI and infrastructure to keep apps consistent

## Data and API Surfaces

### Application APIs

Application API handlers are implemented under the relevant app's `app/api` directory.

These layers are where integrations, content delivery, and operational endpoints live.

## External Integrations

- Next.js and React
- Firebase and Supabase-ready patterns
- Vercel deployment support
- shared design-system storytelling and Storybook workflows

## Validation and Shipping

Use these checks before shipping meaningful changes:

- `pnpm lint`
- `pnpm type-check`
- `pnpm build`

App-level checks:

- `pnpm --filter nx test`
- `pnpm --dir apps/nx typecheck`

## Recommended Onboarding Sequence

1. Read `docs/README.md`
2. Read `docs/business/executive-overview.md`
3. Read `docs/business/operations-and-delivery.md`
4. Read `docs/concepts/project-evolution.md`
5. Review `apps/nx`
6. Explore `packages/theme`

## First Places to Inspect for Common Tasks

NX workspace:

- `apps/nx/src`

Shared UI & Design System:

- `packages/theme/src`

Shared state & runtime plumbing:

- `packages/uberedux/src`

Shared UI & Design System:

- `packages/theme/src`

Shared state & runtime plumbing:

- `packages/uberedux/src`
- `packages/saas/src`

## Read Next

- [Operations and Delivery](/goldlabel/operations-and-delivery)
- [Despecialisation](/goldlabel/despecialisation)
