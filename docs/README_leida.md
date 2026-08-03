<div>
  <h1 style="display: flex; align-items: center; gap: 8px;">
    <a href="https://app.askleida.com/" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center; margin-right: 8px;">
			<img
				src="https://goldlabel.pro/favicons/favicon_dark.png"
				width="32"
				height="32"
			/>
		</a>
		<span>Handover Hub</span>
	</h1>
</div>


This section is the handover package for Leida as it moves from proof of concept into MVP delivery.

It is written for multiple audiences at once:

- owners who need a clear picture of what has been built and why it matters
- developers who need to understand where things live and how they fit together
- investors who need to see scope, foundation, and maturity
- operators and future team members who need to run and refine the platform safely

## Table of Contents

- [Start Here](#start-here)
- [What This Handover Covers](#what-this-handover-covers)
- [Recent Updates (Last 7 Days)](#recent-updates-last-7-days)
- [The 5 Ws of This Repository](#the-5-ws-of-this-repository)
- [Recommended Reading Paths](#recommended-reading-paths)

### Document Sections

- **[Executive Overview](./executive-overview.md)**
  - [Executive Summary](./executive-overview.md#executive-summary)
  - [The 5 Ws](./executive-overview.md#the-5-ws)
  - [Repository-Level Picture](./executive-overview.md#repository-level-picture)
  - [Main Product Surfaces](./executive-overview.md#main-product-surfaces)
  - [Technical Foundation](./executive-overview.md#technical-foundation)
  - [What Has Been Built Already](./executive-overview.md#what-has-been-built-already)
  - [Why This Is More Than a Prototype](./executive-overview.md#why-this-is-more-than-a-prototype)
  - [Current MVP Position](./executive-overview.md#current-mvp-position)

- **[Owner Guide](./owner-guide.md)**
  - [What the Owner Should Understand About Scope](./owner-guide.md#what-the-owner-should-understand-about-scope)
  - [Why the Monorepo Matters Strategically](./owner-guide.md#why-the-monorepo-matters-strategically)
  - [Evidence of a Professional Foundation](./owner-guide.md#evidence-of-a-professional-foundation)
  - [Operational Capability Already Present](./owner-guide.md#operational-capability-already-present)
  - [Commercial Meaning of the Current State](./owner-guide.md#commercial-meaning-of-the-current-state)
  - [Current Risks the Owner Should Be Aware Of](./owner-guide.md#current-risks-the-owner-should-be-aware-of)
  - [Suggested Owner-Level Next Steps](./owner-guide.md#suggested-owner-level-next-steps)

- **[Developer Guide](./developer-guide.md)**
  - [Repository Map](./developer-guide.md#repository-map)
  - [Architecture Model](./developer-guide.md#architecture-model)
  - [Public App Responsibilities](./developer-guide.md#public-app-responsibilities)
  - [Founder App Responsibilities](./developer-guide.md#founder-app-responsibilities)
  - [Data and API Surfaces](./developer-guide.md#data-and-api-surfaces)
  - [External Dependencies and Integrations](./developer-guide.md#external-dependencies-and-integrations)
  - [Design System and UI Strategy](./developer-guide.md#design-system-and-ui-strategy)
  - [Testing, Type-Checking, and Linting](./developer-guide.md#testing-type-checking-and-linting)

- **[Investor Overview](./investor-overview.md)**
  - [Investment-Level Summary](./investor-overview.md#investment-level-summary)
  - [Why the Current State Is Valuable](./investor-overview.md#why-the-current-state-is-valuable)
  - [Scope Already Covered](./investor-overview.md#scope-already-covered)
  - [Why This Lowers Execution Risk](./investor-overview.md#why-this-lowers-execution-risk)
  - [Evidence From Project Evolution](./investor-overview.md#evidence-from-project-evolution)
  - [What "Solid Foundation" Means Here](./investor-overview.md#what-solid-foundation-means-here)
  - [Honest Current-State Framing](./investor-overview.md#honest-current-state-framing)

- **[Operations and Delivery](./operations-and-delivery.md)**
  - [Daily Founder Workflow](./operations-and-delivery.md#daily-founder-workflow)
  - [Core Operational Domains](./operations-and-delivery.md#core-operational-domains)
  - [Environment Requirements](./operations-and-delivery.md#environment-requirements)
  - [Validation Commands](./operations-and-delivery.md#validation-commands)

- **[Project Evolution](./project-evolution.md)**
  - [Big-Picture Arc](./project-evolution.md#big-picture-arc)
  - [Phase 1: Foundation and Shared UI Direction](./project-evolution.md#phase-1-foundation-and-shared-ui-direction)
  - [Phase 2: Documentation Becomes a First-Class Asset](./project-evolution.md#phase-2-documentation-becomes-a-first-class-asset)
  - [Phase 3: Founder App and Operational Control Plane](./project-evolution.md#phase-3-founder-app-and-operational-control-plane)
  - [Phase 4: Hardening and Technical Discipline](./project-evolution.md#phase-4-hardening-and-technical-discipline)
  - [Phase 5: AWIN Workflow Refinement](./project-evolution.md#phase-5-awin-workflow-refinement)
  - [Phase 6: Product Shelf Architecture and Naming Maturity](./project-evolution.md#phase-6-product-shelf-architecture-and-naming-maturity)
  - [Phase 7: Shared Component and Route Refinement](./project-evolution.md#phase-7-shared-component-and-route-refinement)
  - [Where the Repo Appears to Be Right Now](./project-evolution.md#where-the-repo-appears-to-be-right-now)

## Start Here

| Document | Audience | Purpose |
|---|---|---|
| [Executive Overview](./executive-overview.md) | Everyone | High-level explanation of what Leida is, what the repository contains, and why the current build matters |
| [Owner Guide](./owner-guide.md) | Owner / leadership | Product, delivery, decision-making, and roadmap framing |
| [Developer Guide](./developer-guide.md) | Developers | Architecture, repository map, workflows, data surfaces, and technical onboarding |
| [Investor Overview](./investor-overview.md) | Investors / partners | Commercial framing, scope of work completed, and why the platform is investable |
| [Operations and Delivery](./operations-and-delivery.md) | Operators / PM / technical leads | Day-to-day workflows, environments, testing, deployment, and current operational dependencies |
| [Project Evolution](./project-evolution.md) | Everyone | Narrative of how the repository evolved from foundation work into the current MVP phase |

## What This Handover Covers

- the structure of the monorepo
- the two active applications
- the shared NX runtime and cartridge model
- design-system and UI package strategy
- public-facing product flows and internal founder workflows
- public authentication and routine-share routing behavior
- API and data architecture
- AWIN and practitioner operations
- testing, type-checking, linting, and deployment posture
- Vercel build guardrails for monorepo safety
- the project’s evolution through recent commit history

## Recent Updates (Last 7 Days)

The past week included active product and infrastructure refinement across both code and docs:

- Supabase auth gate added to the public Leida runtime, with session-aware login/logout flow and route-level gating.
- Public routine experience expanded with side-by-side routine views, AM/PM product slider sections, aftercare blocks, and footer refinements.
- Routine data contract and API plumbing reshaped around client routine payload retrieval.
- Design-system image stack expanded with `Image`, `Thumbnail`, and `ImageEnlarger`, plus ProductItem card refinement.
- Storybook configuration and package/versioning were updated during the 4.3.x release series.
- AskLeida video asset cleanup reduced unused media footprint.
- Docs media/header assets were refreshed and logo paths standardized.

## The 5 Ws of This Repository

### What

Leida is a monorepo that contains:

- a public-facing Next.js application at `apps/www`
- a founder/admin Next.js application at `apps/founder`
- shared packages at `packages/design-system` and `packages/ui`
- shared internal runtime infrastructure under the NX framework

### Why

The repository exists to support both sides of the product:

- the external Leida experience
- the internal workflows needed to curate products, manage practitioners, and operate the platform professionally

### Who

The main audiences are:

- end users interacting with the public app
- founders and internal operators using the founder dashboard
- developers extending both apps and shared packages
- commercial stakeholders assessing progress and readiness

### Where

The main code lives in:

- `apps/www`
- `apps/founder`
- `packages/design-system`
- `packages/ui`
- `docs`

### When

This handover captures the repository at the point where the project is being positioned as an MVP with a reusable, documented foundation rather than a loose prototype.

## Recommended Reading Paths

### If you are the owner

1. [Executive Overview](./executive-overview.md)
2. [Owner Guide](./owner-guide.md)
3. [Project Evolution](./project-evolution.md)
4. [Operations and Delivery](./operations-and-delivery.md)

### If you are a developer

1. [Executive Overview](./executive-overview.md)
2. [Developer Guide](./developer-guide.md)
3. [Operations and Delivery](./operations-and-delivery.md)
4. [Project Evolution](./project-evolution.md)

### If you are an investor

1. [Executive Overview](./executive-overview.md)
2. [Investor Overview](./investor-overview.md)
3. [Project Evolution](./project-evolution.md)

## Related Repository Docs

- [Documentation Home](../README.md)
- [Founder App README](../apps/founder/README.md)
- [Public Products Module README](../apps/www/app/Leida/Products/README.md)
