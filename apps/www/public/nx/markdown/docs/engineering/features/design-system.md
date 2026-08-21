---
order: 9044
title: Design System
description: <div>
slug: /docs/engineering/features/design-system
icon: docs
tags: docs
---
Material UI

> Tags: docs, engineering, features, design-system

> [CleverText text="No other design system sees the same breadth of adoption as Material"]

Material UI, commonly known as MUI, has grown into the most widely used React component library and design system. Its popularity comes from a mix of practical engineering benefits: a complete suite of pre-built components, a predictable theming model, strong TypeScript support, and an ecosystem that stays aligned with modern React patterns.

MUI solves the design system gap for teams that need polished UI out of the box without building every component from scratch. Layouts, form controls, grids, navigation, typography; everything behaves consistently, scales cleanly, and can be themed to match any brand. In the React ecosystem, no other design system sees the same breadth of adoption across startups, enterprise teams, and solo developers.

NX uses MUI as the foundation for its own theme cartridge, extending the base components with custom styling, utility components, and layout primitives. It gives a consistent look, predictable behaviour, and a reliable way to handle UI complexity without reinventing the basics.

#### Design System

This package is the shared home for presentation-layer work in NX°. It is meant to own the frontend experience beyond a simple color theme, including:

- a reusable design token and theme layer
- layout primitives for pages and sections
- shared UI wrappers that can be used across apps and features

#### Goals

- Keep visual decisions centralized in one package
- Make it easy to build consistent interfaces across the monorepo
- Provide a lightweight foundation for future component libraries

#### Package structure

- `src/theme.ts` – theme creation and shared design tokens
- `src/components/DesignSystemProvider.tsx` – provider that applies the theme and baseline styles
- `src/components/Primitives.tsx` – layout helpers such as app shells and section wrappers
- `src/index.ts` – public exports for the package

#### Usage

```tsx
import { DesignSystemProvider, AppShell, PageSection, SectionTitle } from '@nx/design-system';

export default function ExamplePage() {
  return (
    <DesignSystemProvider mode="light">
      <AppShell>
        <PageSection>
          <SectionTitle title="Welcome" subtitle="Shared frontend primitives live here." />
        </PageSection>
      </AppShell>
    </DesignSystemProvider>
  );
}
```

#### Building

This package ships compiled JavaScript and type declarations to `dist/`.

Run the build locally:

```bash
pnpm build
```

Notes:
- The package expects `react`, `react-dom`, and `@mui/material` as peer dependencies.
- `main`/`types` point to the `dist/` output; add the package to your monorepo's workspace or publish if desired.

#### Notes

This package is intentionally small and composable. As the UI layer grows, new atoms, molecules, and higher-level patterns should be added here instead of being spread across app folders.
