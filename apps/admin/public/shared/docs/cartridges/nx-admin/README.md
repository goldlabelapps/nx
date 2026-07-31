# NX° Admin Cartridge

NX° Admin is a full back-office administration panel that plugs into any NX° host application. It provides:

- Firebase-authenticated access control (sign-in wall)
- A collapsible side-drawer navigation shell
- A dashboard landing page (MegaDash)
- Generic Firestore CRUD management for any collection
- Built-in pages for Accounts, Prospects, Avatars, Queue, Viruses, and Fingerprints
- PWA install prompt
- Firebase Cloud Messaging (FCM) push notifications

---

## Documentation Index

| Document | Description |
|---|---|
| [Overview & Getting Started](./README.md) | This page |
| [Components Reference](./components.md) | All exported components |
| [Actions Reference](./actions.md) | All Redux thunk actions |
| [Hooks Reference](./hooks.md) | All custom React hooks |
| [CRUD System](./crud.md) | Generic Firestore CRUD for any collection |
| [Push Notifications](./notifications.md) | FCM push notification setup |
| [PWA Support](./pwa.md) | Progressive Web App install prompt |

---

## Quick Start

### 1. Mount the cartridge

```tsx
// app/(admin)/layout.tsx
import { UbereduxProvider } from '@/NX/Uberedux';
import { NXAdmin } from '@/NX/NXAdmin';
import config from '@/config.json';

export default function AdminLayout() {
  return (
    <UbereduxProvider>
      <NXAdmin config={config} />
    </UbereduxProvider>
  );
}
```

### 2. Environment variables

NX° Admin requires Firebase to be configured via environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=   # Required for push notifications
```

### 3. Service worker (push notifications)

Copy `public/firebase-messaging-sw.js` to the root of your `public/` folder. This is the background service worker that handles push notifications when the app is not in focus.

---

## How It Works

```
<NXAdmin config={…}>
  ├── useFirebaseAuthListener()      ← subscribes to Firebase Auth state
  ├── <DesignSystem>                 ← MUI theme wrapper
  │    └── <Feedback />             ← global toast
  │
  ├── [unauthenticated] → <SimpleSignIn />
  │
  └── [authenticated]  → <MiniDrawer config={…}>
         ├── <AppBar>
         │    └── <Header />        ← displays active page title
         ├── <Drawer>
         │    └── <LeftDrawer />    ← navigation links + account menu
         └── <main>
              └── <PageRouter active={…} />  ← renders the active page
```

### Authentication Flow

1. `useFirebaseAuthListener()` subscribes to Firebase Auth state changes.
2. While auth state is being resolved, `NXAdmin` renders `null` (avoids flash).
3. When unauthenticated, renders `<SimpleSignIn>` centred in the viewport.
4. When authenticated, renders the full admin shell and calls `requestNotifications()` to set up push.

### Navigation

The active route is derived from the URL pathname. `MiniDrawer` syncs the URL with `nxAdmin.active` in Redux. Navigating to `/accounts` sets `active = 'accounts'`, which `PageRouter` uses to render the correct page component.

**Built-in routes**

| Path | Component |
|---|---|
| `/` | `<MegaDash />` (dashboard) |
| `/accounts` | `<Accounts />` |
| `/account` | `<MyAccount />` |
| `/account/:id` | `<EditAccount />` |
| `/prospects` | `<Prospects />` |
| `/prospects/:id` | `<Prospect />` |
| `/queue` | `<Queue />` |
| `/virus` | `<Viruses />` |
| `/fingerprints` | `<Fingerprints />` |

---

## Redux State Shape

NX° Admin stores all its state under `state.redux.nxAdmin`:

```ts
{
  nxAdmin: {
    active: string | null,          // current route key
    header: {                       // top-bar title/icon
      title: string;
      icon?: string;
    } | null,
    dash: { … } | null,            // MegaDash data
    crud: {                         // per-collection CRUD state
      [collectionName: string]: {
        collection: string;
        initted: boolean;
        subscribed: boolean;
        mode: 'read' | 'create' | 'update' | 'delete';
        docs: any[];
        typescript: Record<string, any>;
        selected: any | null;
        saving?: boolean;
        error?: string;
        orderByField?: string | null;
        orderDirection?: 'asc' | 'desc' | null;
        searchTerm?: string;
      }
    },
    notifications: {
      permission: 'default' | 'granted' | 'denied';
      fcmToken: string | null;
      unreadCount: number;
      initialized: boolean;
    },
    pwa: {
      initialized: boolean;
      supported: boolean;
      installed: boolean;
      installable: boolean;
      lastOutcome: 'accepted' | 'dismissed' | null;
    }
  }
}
```
