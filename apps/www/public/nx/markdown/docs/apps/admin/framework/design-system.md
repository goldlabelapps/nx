---
order: 9010
title: NX° Framework — DesignSystem Cartridge
description: <div>
slug: /docs/apps/cms/framework/design-system
icon: docs
tags: docs
---
NX repository documentation

> Tags: docs, apps, admin, framework, design-system

# NX° Framework — DesignSystem Cartridge

The `DesignSystem` cartridge provides MUI (Material UI v6) theming, global feedback toasts, an icon library, and a collection of shared UI primitives that all other cartridges consume.

---

#### Mounting

`<DesignSystem>` is mounted automatically by `<NX>` and `<NXAdmin>` — you do not need to render it manually unless you are building a standalone cartridge.

```tsx
import { DesignSystem } from '@/NX/DesignSystem';

<DesignSystem theme={themeObj} config={config}>
  {children}
</DesignSystem>
```

---

#### Public API (`app/NX/DesignSystem/index.tsx`)

### Actions

| Export | Description |
|---|---|
| `fetchMarkdown(path)` | Fetches a markdown file and stores it in Redux |
| `navigateTo(path)` | Programmatic navigation (wraps Next.js router) |
| `setDesignSystem(key, value)` | Updates the `designSystem` Redux slice |
| `setFeedback(payload)` | Triggers a feedback toast |

### Components

| Export | Description |
|---|---|
| `DesignSystem` | Root MUI `ThemeProvider` + CssBaseline wrapper |
| `Feedback` | Global snackbar/toast driven by Redux state |
| `Header` | Page-level title + description header |
| `Hero` | Full-width hero section |
| `Icon` | NX° icon component (see Icon section below) |
| `Nav` | Horizontal navigation bar |
| `TreeNav` | Collapsible tree-style sidebar navigation |
| `Footer` | Fixed bottom footer with full-width blurred surface and contained link grid |
| `Loader` | Circular loading indicator |
| `CleverText` | Adaptive typography component |
| `EditableStr` | Inline editable string field |
| `Related` | Related content links widget |

### Hooks

| Export | Description |
|---|---|
| `useConfig()` | Returns the config object from Redux |
| `useDesignSystem()` | Returns the full `designSystem` Redux slice |
| `useFeedback()` | Returns current feedback state |
| `useMUITheme()` | Returns the MUI theme object |
| `useMarkdown()` | Returns current markdown document from Redux |

---

#### Theming

Themes are defined in `config.json` under `cartridges.designSystem.themes`. The active theme key is stored in `state.redux.designSystem.themeMode`.

### Switching themes at runtime

```tsx
import { setDesignSystem } from '@/NX/DesignSystem';
import { useDispatch } from '@/NX/Uberedux';

function ThemeToggle() {
  const dispatch = useDispatch();
  const toggle = () => dispatch(setDesignSystem('themeMode', 'dark'));
  return <button onClick={toggle}>Dark mode</button>;
}
```

---

#### Footer Layout

The shared `Footer` is rendered as a fixed bottom `AppBar`.

- The outer footer surface spans the viewport width and provides the blurred/translucent background.
- The inner toolbar is width-constrained to align with the page content gutters.
- Footer sections are distributed as a responsive grid: 4 columns on desktop, 2 on medium screens, 1 on small screens.
- Each section is left-aligned for label and link readability.

Primary implementation styles live in `packages/design-system/src/styles/site-layout.css` under:

- `.site-footer`
- `.site-footer-toolbar`
- `.site-footer-columns`
- `.site-footer-section`

---

#### Feedback Toasts

Any cartridge can dispatch a toast by calling `setFeedback`:

```ts
import { setFeedback } from '@/NX/DesignSystem';

dispatch(setFeedback({
  severity: 'success',   // 'success' | 'error' | 'warning' | 'info'
  title: 'Saved!',
  description: 'Your changes were saved successfully.',
}));

// Clear the toast
dispatch(setFeedback(null));
```

The `<Feedback />` component must be mounted somewhere in the tree (it is included automatically by `<NX>` and `<NXAdmin>`).

---

#### Icon Component

`<Icon>` renders one of the 200+ named icons in the NX° icon library.

```tsx
import { Icon } from '@/NX/DesignSystem';

<Icon icon="dashboard" color="primary" />
<Icon icon="account" />
<Icon icon="signout" color="error" />
```

The full list of valid icon names is defined in the `I_Icon` type in `app/NX/types.d.ts`.
