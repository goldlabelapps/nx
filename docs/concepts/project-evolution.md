<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Project Evolution</span>
    </h1>
</div>

NX repository documentation

> Tags: docs, concepts, project-evolution

<div>
	<h1 style="display: flex; align-items: center; gap: 8px;">
		<a href="https://app.askleida.com/" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center; margin-right: 8px;">
			<img
				src="https://goldlabel.pro/favicons/favicon_dark.png"
				width="32"
				height="32"
			/>
		</a>
		<span>Project Evolution</span>
	</h1>
</div>

## Purpose

This document summarizes how Leida has evolved and what changed most recently.

It is a narrative summary, not a full changelog.

## Big-Picture Arc

The repository progression is:

1. shared UI and runtime foundations
2. centralized handover documentation
3. founder operational workflows
4. stronger package exports and typing
5. AWIN and product-flow refinement
6. route and UX cleanup across public/founder surfaces

## Phase 1: Foundation and Shared UI Direction

Early work established a reusable design-system base, tokenization, and package-level component exports.

Why it mattered:

- reduced duplicated local UI
- introduced reusable visual primitives
- established a package-first UI direction

## Phase 2: Documentation as an Asset

Docs were consolidated into a centralized handover set.

Why it mattered:

- improved onboarding readiness
- made architecture and operations legible
- reduced dependency on tribal knowledge

## Phase 3: Founder Operational Surface

Founder app capabilities became a dedicated operational control plane.

Core capabilities:

- practitioner management
- AWIN ingestion/search
- queue decisioning and processing
- product list and curation flows

## Phase 4: Technical Hardening

Repository history shows repeated hardening work around typing, script discipline, and build safety.

Signals include:

- stronger TypeScript contracts
- improved runtime/config consistency
- build and deployment guardrail scripting

## Phase 5: AWIN Workflow Refinement

AWIN moved from basic integration to operator-focused flow improvements.

Focus areas:

- search usability
- ingest and feed sync control
- queue and bulk action handling

## Phase 6: Product Shelf and Routine Flow Evolution

Public product/routine flows were reshaped around clearer domain semantics and better practitioner workflows.

Observed trajectory:

- product shelf naming and route cleanup
- route split between preview/edit contexts
- richer routine authoring and viewing capabilities

## Phase 7: Shared Component Maturity

Design-system assets continued to absorb reusable component work.

Examples:

- product card and ProductItem polish
- image stack additions (`Image`, `Thumbnail`, `ImageEnlarger`)
- routine presentation component reuse

## Phase 8: Last 7 Days (2026-07-27 to 2026-08-03)

Recent commits indicate a concentrated refinement sprint:

- added Supabase auth gate to public Leida runtime
- introduced login/logout UX and session synchronization
- kept `/routine/:client_id` as a public bypass route for shareable routine delivery
- expanded routine page UI with side-by-side rendering, AM/PM slider, aftercare, and footer components
- reshaped routine API flow around client routine payload retrieval
- fixed Storybook config and continued version progression through 4.3.x
- cleaned docs media/header assets and logo paths
- removed unused large AskLeida video assets

## What the History Says About Direction

The overall pattern is not random experimentation. It is structured iteration:

- architecture remains consistent
- product language and routes are being clarified
- shared components are expanding
- operational tooling is being tightened
- docs are maintained as part of delivery

## Where the Repo Is Now

The current phase is late-MVP refinement:

- authenticated app shell behavior is now explicit
- public routine sharing UX is materially richer
- deployment safety checks are stricter
- design-system and docs continue to be actively maintained

## Practical Meaning for Handover

Leida is evolving through consolidation rather than replatforming.

That means future work is mostly:

- refinement
- extension
- reliability improvements

rather than foundational rebuild.

## Read Next

- [Executive Overview](../business/executive-overview.md)
- [Developer Guide](../engineering/developer-guide.md)
- [Owner Guide](../business/owner-guide.md)
