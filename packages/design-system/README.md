# Design System

This package is the shared home for presentation-layer work in NX. It is meant to own the frontend experience beyond a simple color theme, including:

- a reusable design token and theme layer
- layout primitives for pages and sections
- shared UI wrappers that can be used across apps and features

## Goals

- Keep visual decisions centralized in one package
- Make it easy to build consistent interfaces across the monorepo
- Provide a lightweight foundation for future component libraries

## Package structure

- `src/theme.ts` – theme creation and shared design tokens
- `src/components/DesignSystemProvider.tsx` – provider that applies the theme and baseline styles
- `src/components/Primitives.tsx` – layout helpers such as app shells and section wrappers
- `src/index.ts` – public exports for the package

## Usage

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

## Notes

This package is intentionally small and composable. As the UI layer grows, new atoms, molecules, and higher-level patterns should be added here instead of being spread across app folders.
