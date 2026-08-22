<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Developer Guide</span>
    </h1>
</div>

NX repository documentation

> Tags: docs, engineering, developer-guide

<div>
	<h1 style="display: flex; align-items: center; gap: 8px;">
		<a href="https://app.askleida.com/" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center; margin-right: 8px;">
			<img
				src="https://goldlabel.pro/favicons/favicon_dark.png"
				width="32"
				height="32"
			/>
		</a>
		<span>Developer Guide</span>
	</h1>
</div>

## Purpose

This guide is the practical handover for developers building on NX°.

It explains:

- where the product code lives
- how the workspace is structured
- how apps, packages, and shared runtime layers fit together
- how to validate changes before shipping

## The 5 Ws for a Developer

### What am I looking at?

A Turborepo-managed monorepo with multiple Next.js applications and shared packages:

- `apps/www` -> the public product experience
- `apps/cms` -> CMS and operational tooling
- `packages/design-system` -> reusable UI, tokens, and component primitives
- `packages/markdown` -> markdown rendering, shortcode parsing, and content-extension helpers
- `packages/uberedux` -> shared state and provider patterns

### Why is it organized this way?

To keep shared product logic, design systems, and delivery infrastructure reusable while preserving clear boundaries between customer-facing surfaces and internal tools.

### Who works in which area?

- public product experience: `apps/www`
- CMS and operational workflows: `apps/cms`
- reusable UI and design system: `packages/design-system`
- shared state/runtime patterns: `packages/uberedux`

### Where are the critical boundaries?

- public app vs admin app
- shared runtime layers vs app-specific features
- package exports vs app-level composition
- API routes vs client-side experience layers

### When should I care about each layer?

- customer experience work: `apps/www`
- operational and internal tooling: `apps/cms`
- cross-app UI primitives: `packages/design-system`
- shared state and runtime plumbing: `packages/uberedux`

## Repository Map

### Root

- `package.json` -> workspace scripts and versions
- `pnpm-workspace.yaml` -> workspace membership
- `turbo.json` -> task orchestration
- `apps/` -> deployable product surfaces
- `packages/` -> shared product infrastructure
- `docs/` -> product, delivery, and technical documentation

### Public App: `apps/www`

Main roots:

- `app/` -> public product routes and experience layers
- `app/NX` -> shared runtime framework and product cartridges
- `app/api` -> public APIs and integrations
- `tests/` -> automated test coverage

Common commands:

- `pnpm --filter www dev`
- `pnpm --filter www test`
- `pnpm --filter www typecheck`
- `pnpm --filter www lint`

### CMS App: `apps/cms`

Main roots:

- `app/` -> CMS experience and internal operations
- `app/NX` -> shared runtime and support layers
- `app/api` -> internal API handlers

Common commands:

- `pnpm --filter cms dev`
- `pnpm --filter cms typecheck`
- `pnpm --filter cms lint`

### Shared Packages

#### `packages/design-system`

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

### NX Runtime

Both apps use a shared runtime layer under `app/NX`.

In practice:

- features are organized into modular cartridges
- cartridges own actions, hooks, and components
- global state is managed through shared patterns
- tenant configuration drives branding and app behavior

### Product Composition

The platform is designed to support multiple product surfaces from one shared codebase:

- a public experience for audiences and customers
- an CMS experience for operators and maintainers
- shared UI and infrastructure to keep both consistent

## Data and API Surfaces

### Public APIs

Implemented under `apps/www/app/api`.

### CMS APIs

Implemented under `apps/cms/app/api`.

These layers are where integrations, content delivery, and operational endpoints live.

## External Integrations

- Next.js and React
- Firebase and Supabase-ready patterns
- Vercel deployment support
- shared design-system storytelling and Storybook workflows

## Validation and Shipping

Use these checks before shipping meaningful changes:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

App-level checks:

- `pnpm --filter www test`
- `pnpm --filter cms typecheck`

## Recommended Onboarding Sequence

1. Read `docs/README.md`
2. Read `docs/business/executive-overview.md`
3. Read `docs/business/operations-and-delivery.md`
4. Read `docs/concepts/project-evolution.md`
5. Review `apps/www` and `apps/cms`
6. Explore `packages/design-system`

## First Places to Inspect for Common Tasks

Public product work:

- `apps/www/app`
- `apps/www/app/NX`

CMS work:

- `apps/cms/app`
- `apps/cms/app/NX`

Shared UI work:

- `packages/design-system/src`
- `packages/uberedux/src`

- `apps/founder/app/Leida`
- `apps/founder/app/api`

Shared runtime work:

- `apps/www/app/NX`
- `apps/founder/app/NX`

Shared UI work:

- `packages/design-system`
- `packages/ui`

## Read Next

- [Operations and Delivery](../business/operations-and-delivery.md)
- [Project Evolution](../concepts/project-evolution.md)
