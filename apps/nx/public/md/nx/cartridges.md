---
order: 9200
title: Cartridges
description: Cartridge-level documentation for apps/cms
icon: docs
tags: architecture, cartridges, plugins
image: nx
---

# Cartridges in NX°

In NX°, a **cartridge** is a self-contained feature module that plugs into the shared application shell. Cartridges let an app be assembled from focused capabilities instead of one large, tightly coupled codebase. A cartridge can be enabled, removed, or replaced without changing unrelated features.

Each cartridge owns the code needed for its feature, including React components, actions, hooks, and any related state. It exposes a clear public entry point to the rest of the framework and keeps its Redux state under its own namespace. Cartridge-specific settings are supplied through the host application's `config.json` under `cartridges`.

Examples include:

- **DesignSystem**, which provides theming, icons, and shared UI primitives
- **NXAdmin**, which provides the back-office application
- **Paywall**, which provides authentication and account access
- **Flash**, which provides animation and MovieClip capabilities
- **Shortcodes**, which provides reusable content transformations

Together, cartridges form the modular parts of an NX° application. The root `<NX>` component provides the shared host context, while each cartridge contributes its own feature area within that context.
