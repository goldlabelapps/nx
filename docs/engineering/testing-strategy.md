<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Testing Strategy</span>
    </h1>
</div>

NX repository documentation

> Tags: docs, engineering, testing-strategy

# Testing Strategy: How We Prove Quality at NX°

If you want confidence, speed, and low-risk delivery, you need a testing system that is intentional, repeatable, and visible.

NX° is built with exactly that mindset.

This document explains what we test, why we test it, how those tests run, and what "good" looks like across the monorepo.

## The Pitch

Great testing is not about chasing 100% coverage. It is about reducing expensive surprises.

At NX°, our testing approach is designed to:

- catch regressions before release
- protect shared runtime behavior used by multiple apps
- validate UI building blocks that power product velocity
- enforce test framework consistency across workspaces
- keep shipping speed high without accepting hidden quality risk

When we say quality, we mean: predictable behavior under change.

## What We Test

### 1. Application Unit and Integration Behavior (Jest)

Workspaces:

- `apps/www`

What we validate:

- server-side markdown and slug resolution logic
- navigation generation from content
- redux and action behavior
- shared runtime helpers and app-level feature logic

Why it matters:

- these apps are customer-facing surfaces
- content-driven routing/navigation is a high-regression area
- predictable app behavior protects product trust

How it runs:

- `jest --runInBand --passWithNoTests`
- current expectations are validated by framework guard tests to prevent script drift

### 2. Design System Component Tests (Vitest + JSDOM)

Workspace:

- `packages/design-system`

What we validate:

- rendering of core primitives (buttons, navigation, layout, feedback, images, headings)
- interaction behavior and expected UI states
- design-system provider integration behavior

Why it matters:

- this package is a force multiplier across apps
- one regression here can break several product surfaces
- component confidence directly improves delivery speed

How it runs:

- `vitest run`
- optional coverage via `vitest run --coverage`

### 3. Shared Package Runtime Tests (Node Test Runner + TSX)

Workspaces:

- `packages/firebase`
- `packages/uberedux`

What we validate:

- environment-gated Firebase behavior
- state update and persistence helpers

Why it matters:

- package-level bugs spread quickly to multiple apps
- runtime logic is where hard-to-debug production issues often begin

How it runs:

- `node --test` for JS tests
- `tsx --test` for TypeScript tests

### 4. Monorepo Governance and Framework Guard Tests (Node Test Runner)

Workspace:

- root `tests/*.test.mjs`

What we validate:

- workspace structure assumptions (apps/packages roots)
- critical workspaces must define non-empty `scripts.test`
- high-risk script formatting regressions are blocked
- package tests avoid brittle app-local binary paths

Why it matters:

- this protects the testing framework itself
- catches CI and local-test breakages caused by script drift
- keeps testing conventions explicit and enforceable

## How Tests Run Repository-Wide

Primary entrypoint:

- `pnpm test`

Execution flow:

1. root runner executes workspace tests recursively where `scripts.test` exists
2. root runner then executes framework/monorepo node tests

Current runner implementation:

- `tests/run-monorepo-tests.mjs`

This gives us one command for full confidence checks across app and package boundaries.

## What Good Looks Like

A healthy testing posture in this repo means:

- every critical workspace has an executable test script
- app tests are deterministic and not dependent on execution order
- shared packages run tests without coupling to another app's node_modules path
- framework guard tests catch accidental test-command regressions
- root `pnpm test` remains green and fast enough for daily usage

## Why This Is a Competitive Advantage

Teams that test well ship faster over time.

NX° testing discipline gives us:

- lower rollback risk
- faster refactors with confidence
- safer shared-package reuse
- cleaner handoffs between product and engineering
- better CI signal quality

In short: we do not just "have tests". We have a testing system that protects delivery.

## Command Reference

From repo root:

- `pnpm test` runs the full monorepo testing pipeline
- `pnpm test:coverage` runs merged monorepo coverage across Jest, Vitest, and Node/TSX suites
- `pnpm --dir apps/www test` runs public app tests only
- `pnpm --dir packages/design-system test` runs design-system tests only
- `pnpm --dir packages/uberedux test` runs uberedux package tests only
- `pnpm --dir packages/firebase test` runs firebase package tests only

## Next-Level Enhancements

When we want to raise the bar further, highest-value additions are:

1. add coverage thresholds for critical packages and app layers
2. add smoke-level e2e checks for top user journeys
3. run changed-tests-first optimization in CI for faster feedback
4. add contract tests for shared package public exports

These are incremental upgrades on top of a working, repo-wide testing foundation.
