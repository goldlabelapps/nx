<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/favicons/favicon_dark.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Admin</span>
    </h1>
</div>

NX repository documentation

> Tags: docs, apps, admin, admin

# NX° Framework Documentation

Welcome to the official documentation for the **NX° Framework** — a modular, cartridge-based React/Next.js architecture built on Firebase, MUI, and Redux Toolkit.

---

## What is NX°?

NX° is a composable application framework. Rather than a monolithic codebase, NX° apps are assembled from self-contained **cartridges** — pluggable modules that can be switched on or off per project. Each cartridge owns its own components, actions, hooks, and Redux state slice, making it trivially portable between NX° host applications.

---

## Documentation Index

### Framework Core

| Document | Description |
|---|---|
| [Framework Overview](./framework/overview.md) | Architecture, cartridge concept, file structure |
| [Configuration](./framework/config.md) | `T_Config` schema and the `config.json` contract |
| [Uberedux](./framework/uberedux.md) | NX° global state management layer |
| [DesignSystem](./framework/design-system.md) | Theming, MUI integration, and the `DesignSystem` cartridge |

### Cartridges

| Cartridge | Description |
|---|---|
| [Dashboard](./cartridges/nx-admin/nx-admin.md) | Back-office administration panel |

---

## Quick-start

```tsx
// app/layout.tsx (or your root page)
import { UbereduxProvider } from '@/NX/Uberedux';
import { NX } from '@/NX';
import config from '@/config.json';

export default function RootLayout({ children }) {
  return (
    <UbereduxProvider>
      <NX config={config}>
        {children}
      </NX>
    </UbereduxProvider>
  );
}
```

Mount the **Dashboard** cartridge on a protected route:

```tsx
// app/admin/page.tsx
import { NXAdmin } from '@/NX/NXAdmin';
import config from '@/config.json';

export default function AdminPage() {
  return <NXAdmin config={config} />;
}
```

---

## Conventions

- Every cartridge is located under `app/NX/<CartridgeName>/`.
- Each cartridge exposes its public API through a barrel `index.tsx`.
- State is stored in a single Redux store via Uberedux; each cartridge namespaces its slice under `state.redux.<cartridgeName>`.
- Cartridge configuration lives in the top-level `config.json` under the `cartridges` key.
