---
order: 3
title: Testing & Quality
description: Unit testing, end-to-end testing, and code quality tooling.
icon: ShieldCheck
tags: testing, quality-assurance, vitest
---

# Testing & Quality

This template ships with unit, integration, and end-to-end testing already configured.

## Unit & Component Tests

Unit and component tests use [Vitest](https://vitest.dev) and Testing Library.

```bash
pnpm test          # run once
pnpm test:watch    # watch mode
pnpm test:coverage # with coverage report
```

## End-to-End Tests

End-to-end tests use [Playwright](https://playwright.dev).

```bash
pnpm test:e2e      # run headless
pnpm test:e2e:ui   # run with the Playwright UI
```

## Linting & Type Checking

```bash
pnpm lint
pnpm type-check
```

## Full CI Check

Run everything CI runs before opening a pull request:

```bash
pnpm ci
```
