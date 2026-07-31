# NX° Framework — Configuration (`T_Config`)

Every NX° application is driven by a single configuration object that is passed to the root `<NX>` (and to any cartridge that needs it). By convention this object is stored as `config.json` at the root of the app and imported directly into server or client components.

---

## Schema

```ts
type T_Config = {
  siteName: string;          // Display name of the application
  tenant: string;            // Tenant identifier (used for multi-tenancy)
  description: string;       // Short description (used in <meta> tags)
  url: string;               // Canonical URL of the deployment

  owner: {
    name: string;            // Owner / organisation name
    email: string;           // Contact e-mail
  };

  images: {
    light: string;           // Logo path for light theme
    dark: string;            // Logo path for dark theme
  };

  favicon: string;           // Favicon path

  avatars: {
    light: string;           // Default avatar for light theme
    dark: string;            // Default avatar for dark theme
  };

  cartridges: {
    designSystem?: T_DesignSystemCartridge;
    // Additional per-cartridge config keys go here
  };
};
```

---

## `cartridges.designSystem`

Controls theming across the entire application.

```ts
type T_DesignSystemCartridge = {
  themeSwitching: boolean;    // Allow users to toggle themes at runtime
  defaultTheme: string;       // Key of the theme to use by default (e.g. 'light')
  themes: {
    [themeKey: string]: {
      mode: string;           // 'light' | 'dark' — passed to MUI
      primary: string;        // Primary colour (hex / CSS value)
      secondary: string;      // Secondary colour
      background: string;     // Page background colour
      paper: string;          // Surface / card background colour
      border: string;         // Border colour
      text: string;           // Default text colour
    };
  };
};
```

### Example

```json
{
  "siteName": "My NX° App",
  "tenant": "my-tenant",
  "description": "Admin portal for My NX° App",
  "url": "https://my-app.example.com",
  "owner": { "name": "Acme Ltd", "email": "hello@acme.com" },
  "images": { "light": "/shared/png/logo-light.png", "dark": "/shared/png/logo-dark.png" },
  "favicon": "/shared/png/favicon.png",
  "avatars": { "light": "/shared/png/avatar-light.png", "dark": "/shared/png/avatar-dark.png" },
  "cartridges": {
    "designSystem": {
      "themeSwitching": true,
      "defaultTheme": "light",
      "themes": {
        "light": {
          "mode": "light",
          "primary": "#1976d2",
          "secondary": "#9c27b0",
          "background": "#f5f5f5",
          "paper": "#ffffff",
          "border": "#e0e0e0",
          "text": "#212121"
        },
        "dark": {
          "mode": "dark",
          "primary": "#90caf9",
          "secondary": "#ce93d8",
          "background": "#121212",
          "paper": "#1e1e1e",
          "border": "#333333",
          "text": "#ffffff"
        }
      }
    }
  }
}
```

---

## How Config Flows Through the App

1. `config.json` is imported at the page / layout level.
2. It is passed as the `config` prop to `<NX>` and `<NXAdmin>`.
3. `<NX>` reads `config.cartridges.designSystem` to initialise theming.
4. `<NXAdmin>` reads the same design-system section, and also passes `config` to child components that need branding values (logo, site name, etc.).
5. Individual cartridges can extend the `cartridges` map with their own typed keys.

---

## TypeScript tip

Import `T_Config` from the framework types file to get full type-safety:

```ts
import type { T_Config } from '@/NX/types';
```
