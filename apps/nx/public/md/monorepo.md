---
order: 9040
title: Monorepo
description: Apps and Packages
icon: docs
tags: monorepo, packages, architecture
image: nx
---

This monorepo is organized into two main kinds of workspaces: apps and packages.

## Apps
Apps are deployable products or experiences. They contain the user-facing application code and are the places where end-to-end features are assembled.

In this repository, the primary app surface is [apps/nx](../../../../apps/nx) as a config-driven Next.js application template.

## Packages
Packages are reusable building blocks shared across apps or internal tooling. They are typically smaller, focused modules that can be imported by multiple parts of the monorepo.

Examples in this repository include shared libraries under [packages](../../../../packages), such as [packages/theme](../../../../packages/theme) for UI foundations, [packages/uberedux](../../../../packages/uberedux) for shared state, [packages/cli](../../../../packages/cli) for workspace commands, and [packages/saas](../../../../packages/saas) for authentication and routing helpers.

## How to think about them
- Use apps for product experiences and deployment targets.
- Use packages for shared logic, UI, utilities, or integrations.
- Keep app-specific code in apps and reusable logic in packages.

## Rule of thumb
If something is meant to be used by more than one app, it likely belongs in a package. If it is specific to one product experience, it likely belongs in an app.
