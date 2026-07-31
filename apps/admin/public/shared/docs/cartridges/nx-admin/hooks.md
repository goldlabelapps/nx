# NX° Admin — Hooks Reference

All hooks are exported from `app/NX/NXAdmin/index.tsx`. They are client-side only (`'use client'`).

---

## `useNXAdmin()`

Returns the entire `nxAdmin` Redux slice.

**Source:** `NXAdmin/hooks/useNXAdmin.tsx`

```tsx
import { useNXAdmin } from '@/NX/NXAdmin';

function MyComponent() {
  const nxAdmin = useNXAdmin();
  const { active, header, notifications, pwa, crud } = nxAdmin;
}
```

**Returns:** The full `state.redux.nxAdmin` object, spread into a plain object.

| Key | Type | Description |
|---|---|---|
| `active` | `string \| null` | Current route/page key |
| `header` | `{ title: string; icon?: string } \| null` | Top bar title and icon |
| `crud` | `Record<string, CollectionState>` | Per-collection CRUD state |
| `notifications` | `NotificationState` | FCM notification state |
| `pwa` | `PwaState` | PWA install state |
| `dash` | `any` | MegaDash initialised data |

---

## `useCRUD()`

Returns the `nxAdmin.crud` slice — the state map for all initialised collections.

**Source:** `NXAdmin/hooks/useCRUD.tsx`

```tsx
import { useCRUD } from '@/NX/NXAdmin';

function MyComponent() {
  const crud = useCRUD();
  const products = crud?.products; // CollectionState for 'products'
}
```

**Returns:** `state.redux.nxAdmin.crud` — a `Record<string, CollectionState>`.

**CollectionState shape:**

```ts
{
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
```

---

## `useCollection(collection)`

Convenience hook that returns the CRUD state for a single named collection.

**Source:** `NXAdmin/hooks/useCollection.tsx`

```tsx
import { useCollection } from '@/NX/NXAdmin';

function ProductList() {
  const collectionState = useCollection('products');
  const { docs, mode, selected, typescript } = collectionState?.products || {};
}
```

| Parameter | Type | Description |
|---|---|---|
| `collection` | `string` | Firestore collection name |

**Returns:** The same object as `useCRUD()`, but pre-typed for the given collection name.

---

## `useActive()`

Returns the current active route key (`nxAdmin.active`).

**Source:** `NXAdmin/hooks/useActive.tsx`

```tsx
import { useActive } from '@/NX/NXAdmin';

function NavItem({ collection }) {
  const active = useActive();
  const isActive = active === collection;
}
```

**Returns:** `string | null`

---

## `useNotifications()`

Registers a foreground FCM message listener. Should be called once, at the shell level (it is called automatically inside `<MiniDrawer>`).

**Source:** `NXAdmin/hooks/useNotifications.tsx`

```tsx
import { useNotifications } from '@/NX/NXAdmin';

// Called automatically by MiniDrawer — you do not need to call this manually
// unless building a custom shell.
function CustomShell() {
  useNotifications();
  return <div>…</div>;
}
```

**Behaviour on incoming message:**
1. Shows a native browser `Notification` if permission is `'granted'`.
2. Plays `/nxadmin/mp3/notification.mp3` at 60% volume.
3. Increments `nxAdmin.notifications.unreadCount` in Redux.
4. Increments the OS app badge via `navigator.setAppBadge`.

**Cleanup:** The Firestore `onMessage` unsubscribe function is called when the component unmounts.

---

## `useHeader()`

Returns the current page header state (`nxAdmin.header`).

**Source:** `NXAdmin/hooks/useHeader.tsx`

```tsx
import { useHeader } from '@/NX/NXAdmin';

function MyHeader() {
  const header = useHeader();
  // { title: 'Accounts', icon: 'account' }
}
```

**Returns:** `{ title: string; icon?: string } | null`

---

## Setting the Header

Any page component can update the top-bar header by dispatching `setNXAdmin`:

```tsx
import { useDispatch } from '@/NX/Uberedux';
import { setNXAdmin } from '@/NX/NXAdmin';
import React from 'react';

function AccountsPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setNXAdmin('header', { title: 'Accounts', icon: 'account' }));
  }, [dispatch]);

  return <div>…</div>;
}
```
