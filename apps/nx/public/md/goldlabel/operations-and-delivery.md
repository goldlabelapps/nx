---
order: 9019
title: Operations And Delivery
description: NX repository documentation
icon: docs
tags: operations, devops, delivery
image: goldlabel
---

# NX° Operations And Delivery

NX repository documentation

# Operations and Delivery

## Purpose

This guide covers the operating model, validation steps, and delivery practices that keep NX° reliable as it grows.

## The 5 Ws of Operations

### What is being operated?

A monorepo containing:

- config-driven application (`apps/nx`)
- shared packages for UI, branding, and runtime infrastructure

### Why is operations part of the product?

Because modern product delivery depends on more than a polished frontend. It also depends on clear workflows, safe deployment, and maintainable infrastructure.

### Who uses these workflows?

- product and engineering leads
- internal operators
- developers validating releases
- future maintainers onboarding onto the platform

### Where are the main operational concerns?

- app configuration and tenant handling
- build, test, and type-check validation
- deployment and environment guardrails
- shared product infrastructure and admin workflows

### When do these concerns matter?

- before every release
- when changing shared packages or runtime layers
- when deploying to Vercel or validating production readiness

## Delivery Workflow

A dependable delivery flow for NX° typically looks like this:

1. confirm the target app and deployment context
2. validate required environment variables
3. run workspace and app-level checks
4. review shared package and runtime impact
5. ship with clear release awareness

## Core Operational Domains

### Shared Infrastructure

The shared packages and runtime layers are where much of the platform’s leverage lives. Changes here should be reviewed carefully because they can affect multiple apps.

## Environment Requirements

### Runtime and Tooling

- Node compatible with the workspace setup
- pnpm workspace tooling
- Turborepo orchestration

### Required Variables by App

Each app should have the variables required by its own integrations. Its runtime configuration should be checked against the app source before deployment.

### Tenant Config Requirement

Tenant configuration should be present for the active deployment target in the relevant app public directory.

## Validation Commands

Workspace-level:

- `pnpm lint`
- `pnpm type-check`
- `pnpm build`

App-level:

- `pnpm --dir apps/nx test`

## Deployment Posture

NX° is designed to support app-specific deployment rather than a single monorepo-root deployment. Deployment should be treated as an app-level concern with clear validation and environment checks.

## Common Failure Modes

- missing or incomplete env configuration
- misconfigured tenant settings
- deployment root mismatches
- shared package changes that affect multiple apps unexpectedly

## Recommended Release Checklist

1. Confirm the app root and deployment target.
2. Confirm required environment variables for the selected app.
3. Confirm tenant config exists for the deployment target.
4. Run lint, typecheck, and build.
5. Run relevant app tests.
6. Review shared package and runtime impact before shipping.

## Read Next

- [Developer Guide](/nx/developer/developer-guide)
- [Despecialisation](/goldlabel/despecialisation)
