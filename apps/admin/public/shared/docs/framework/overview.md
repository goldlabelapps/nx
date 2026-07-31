# NX° Framework — Architecture Overview

## The Cartridge Model

NX° is built around the concept of **cartridges** — discrete, self-contained feature modules that plug into a shared host shell. Each cartridge:

- Lives in its own directory under `app/NX/<CartridgeName>/`
- Exposes its public surface through a single barrel `index.tsx`
- Owns its own React components, Redux actions, and custom hooks
- Namespaces its Redux state slice under `state.redux.<cartridgeName>`
- Reads its configuration from the host app's `config.json` under `cartridges.<cartridgeName>`

This design makes it possible to add, remove, or swap an entire feature (e.g. Admin, Paywall, Flash, Shortcodes) without touching unrelated parts of the application.

---

## Directory Structure

```
app/
└── NX/                          # NX° Framework root
    ├── NX.tsx                   # Root <NX> wrapper component
    ├── index.tsx                # Framework public barrel
    ├── types.d.ts               # Shared TypeScript types
    │
    ├── DesignSystem/            # Theming cartridge
    ├── Flash/                   # Animation / MovieClip cartridge
    ├── NXAdmin/                 # Admin back-office cartridge ← primary docs focus
    ├── Paywall/                 # Authentication / paywall cartridge
    ├── Shortcodes/              # Content shortcodes cartridge
    ├── Uberedux/                # Global Redux state layer
    └── lib/                     # Shared utilities (Firebase helpers, server hooks…)
```

---

## Core Components

### `<NX>` — Root wrapper

Located at `app/NX/NX.tsx`. Accepts a `config` prop and renders the `DesignSystem` provider around its children. Displays an error boundary if the config is missing or malformed.

```tsx
import { NX } from '@/NX';

<NX config={config}>
  {children}
</NX>
```

**Props**

| Prop | Type | Required | Description |
|---|---|---|---|
| `config` | `T_Config` | ✓ | Application configuration object |
| `children` | `ReactNode` | ✓ | Content to render inside the theme context |

---

## Lifecycle of a Request

```
Browser Request
  └─ Next.js App Router
       └─ UbereduxProvider          (Redux store)
            └─ <NX config={…}>     (DesignSystem / theming)
                 └─ <NXAdmin …>    (Auth guard → MiniDrawer → PageRouter)
                      └─ Page      (Collection / MegaDash / Accounts …)
```

---

## Shared Types (`types.d.ts`)

Key types shared across all cartridges:

| Type | Description |
|---|---|
| `T_Config` | Full application config schema |
| `T_Theme` | Theme token set (`primary`, `secondary`, `background`, `paper`, `text`, `border`, `mode`) |
| `T_Severity` | `'success' \| 'error' \| 'warning' \| 'info'` |
| `T_Feedback` | Feedback/toast payload |
| `T_Frontmatter` | Markdown frontmatter metadata |
| `T_NavItem` | Navigation tree node |
| `I_Icon` | Union of all valid icon identifiers |

---

## Available Cartridges

| Cartridge | Directory | Purpose |
|---|---|---|
| **DesignSystem** | `NX/DesignSystem` | MUI theming, feedback toasts, icons, nav |
| **Flash** | `NX/Flash` | ActionScript-style animation / MovieClip system |
| **NXAdmin** | `NX/NXAdmin` | Full admin back-office panel |
| **Paywall** | `NX/Paywall` | Firebase Auth sign-in, account management |
| **Shortcodes** | `NX/Shortcodes` | WordPress-style content shortcodes |
| **Uberedux** | `NX/Uberedux` | Shared Redux store (not a UI cartridge) |
