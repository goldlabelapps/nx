# NX° Admin — PWA Support

NX° Admin includes built-in Progressive Web App (PWA) install prompt management. It detects browser install eligibility, exposes the deferred install prompt, and tracks install state — all in Redux.

---

## Overview

The PWA system is driven by two actions (`pwaAlert`, `triggerPwaInstall`) and the `<PWAAlert>` component. State is stored under `state.redux.nxAdmin.pwa`.

---

## Redux State Shape

```ts
state.redux.nxAdmin.pwa = {
  initialized: boolean;   // pwaAlert() has run
  supported: boolean;     // Browser is in a secure context with service worker support
  installed: boolean;     // App is already running in standalone mode
  installable: boolean;   // Browser has fired beforeinstallprompt → prompt available
  lastOutcome: 'accepted' | 'dismissed' | null;  // Result of last install prompt
}
```

---

## `pwaAlert()` Action

Initialises PWA state and registers `beforeinstallprompt` and `appinstalled` event listeners. Called automatically by `<MiniDrawer>` on mount — you do not need to call it manually in standard setups.

**Source:** `NXAdmin/actions/pwaAlert.tsx`

```ts
import { pwaAlert } from '@/NX/NXAdmin';

dispatch(pwaAlert());
```

**Logic:**

1. Guards against SSR (`typeof window === 'undefined'`) and double initialisation.
2. Detects support: `window.isSecureContext && 'serviceWorker' in navigator`.
3. Detects standalone mode: `window.matchMedia('(display-mode: standalone)')` or `navigator.standalone`.
4. Dispatches initial state.
5. Registers `beforeinstallprompt` listener → saves the deferred prompt reference and sets `installable: true`.
6. Registers `appinstalled` listener → sets `installed: true`, `installable: false`.

---

## `triggerPwaInstall()` Action

Triggers the browser's native install dialog using the previously deferred `BeforeInstallPromptEvent`.

**Source:** `NXAdmin/actions/pwaAlert.tsx`

```ts
import { triggerPwaInstall } from '@/NX/NXAdmin';

const accepted: boolean = await dispatch(triggerPwaInstall());
```

**Returns:** `true` if the user accepted, `false` if dismissed or unavailable.

**Behaviour:**

1. Checks that `deferredInstallPrompt` is available.
2. Calls `deferredInstallPrompt.prompt()`.
3. Awaits `deferredInstallPrompt.userChoice`.
4. Dispatches `lastOutcome` and `installable: false`.
5. If accepted, also sets `installed: true`.

---

## `<PWAAlert>` Component

Renders the install prompt UI when the app is installable. Mount it anywhere inside the admin shell.

**Source:** `NXAdmin/components/Menus/PWAAlert.tsx`

```tsx
import { PWAAlert } from '@/NX/NXAdmin';

<PWAAlert />
```

**Behaviour:**
- Reads `nxAdmin.pwa.installable` from Redux.
- When `installable: true`, shows an alert/button prompting the user to install.
- On button click, dispatches `triggerPwaInstall()`.
- Hides itself once installed or dismissed.

---

## Checking PWA State in Components

```tsx
import { useNXAdmin } from '@/NX/NXAdmin';

function InstallBanner() {
  const { pwa } = useNXAdmin();

  if (!pwa?.installable) return null;

  return (
    <div>
      <p>Install this app for a better experience!</p>
      <button onClick={() => dispatch(triggerPwaInstall())}>Install</button>
    </div>
  );
}
```

---

## Requirements

- The app must be served over **HTTPS** (or `localhost`) — `isSecureContext` must be `true`.
- A **service worker** must be registered. The `firebase-messaging-sw.js` file in `public/` satisfies this requirement.
- The app must meet the browser's [PWA installability criteria](https://web.dev/install-criteria/) (manifest, icons, etc.).

---

## Detecting Standalone Mode

The `installed` flag is set to `true` when the app is already running as a PWA:

```ts
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as any).standalone === true;
```

This means `<PWAAlert>` will not offer to install the app when it is already installed.
