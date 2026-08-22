---
order: 9040
title: Apps and Packages
description: <div>
slug: /docs/engineering/apps-packages
icon: docs
tags: docs
---
NX repository documentation

> Tags: docs, engineering, apps-packages

# Apps and Packages

This monorepo is organized into two main kinds of workspaces: apps and packages.

#### Apps
Apps are deployable products or experiences. They contain the user-facing application code and are the places where end-to-end features are assembled.

In this repository, the primary app surfaces are [apps/www](../../apps/www) for the public web experience and [apps/cms](../../apps/cms) for internal operations.

#### Packages
Packages are reusable building blocks shared across apps or internal tooling. They are typically smaller, focused modules that can be imported by multiple parts of the monorepo.

Examples in this repository include shared libraries under [packages](../../packages), such as [packages/design-system](../../packages/design-system), [packages/uberedux](../../packages/uberedux), and utility packages like [packages/firebase](../../packages/firebase).

#### How to think about them
- Use apps for product experiences and deployment targets.
- Use packages for shared logic, UI, utilities, or integrations.
- Keep app-specific code in apps and reusable logic in packages.

#### Rule of thumb
If something is meant to be used by more than one app, it likely belongs in a package. If it is specific to one product experience, it likely belongs in an app.
