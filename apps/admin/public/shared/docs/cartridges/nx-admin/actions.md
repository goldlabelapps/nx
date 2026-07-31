# NX° Admin — Actions Reference

All actions are Redux thunks. They are exported from `app/NX/NXAdmin/index.tsx` and should be dispatched via the `useDispatch()` hook from Uberedux.

---

## `setNXAdmin(key, value)`

The primary state setter for the NX° Admin slice. Merges the given key-value pair into `state.redux.nxAdmin`.

**Source:** `NXAdmin/actions/setNXAdmin.tsx`

```ts
import { setNXAdmin } from '@/NX/NXAdmin';

// Set the active route key
dispatch(setNXAdmin('active', 'accounts'));

// Set the top-bar header
dispatch(setNXAdmin('header', { title: 'Accounts', icon: 'account' }));
```

| Parameter | Type | Description |
|---|---|---|
| `key` | `string` | Key within `nxAdmin` to set |
| `value` | `any` | Value to assign |

The action reads the current `nxAdmin` object, spreads it, overwrites the given key, and dispatches the result via `setUbereduxKey`.

---

## `setCRUD(collection, key, value)`

Updates a specific key within a collection's CRUD state at `state.redux.nxAdmin.crud[collection][key]`.

**Source:** `NXAdmin/actions/setCRUD.tsx`

```ts
import { setCRUD } from '@/NX/NXAdmin';

// Switch a collection to 'create' mode
dispatch(setCRUD('products', 'mode', 'create'));

// Select a document for editing
dispatch(setCRUD('products', 'selected', doc));

// Set saving flag
dispatch(setCRUD('products', 'saving', true));
```

| Parameter | Type | Description |
|---|---|---|
| `collection` | `string` | Firestore collection name |
| `key` | `string` | Key within that collection's CRUD state |
| `value` | `any` | Value to set |

---

## `initCollection(collection, options?)`

Initialises a Firestore collection in the Redux CRUD slice and begins listening for real-time updates (or performs a one-time fetch).

**Source:** `NXAdmin/actions/initCollection.tsx`

```ts
import { initCollection } from '@/NX/NXAdmin';

// Subscribe to real-time updates (default)
dispatch(initCollection('products'));

// One-time fetch with sorting
dispatch(initCollection('products', {
  subscribe: false,
  orderByField: 'created',
  orderDirection: 'desc',
}));

// With search
dispatch(initCollection('contacts', {
  searchTerm: 'john',
}));
```

**Options**

| Option | Type | Default | Description |
|---|---|---|---|
| `subscribe` | `boolean` | `true` | Use `onSnapshot` for real-time updates |
| `orderByField` | `string` | `undefined` | Firestore `orderBy` field |
| `orderDirection` | `'asc' \| 'desc'` | `'asc'` | Sort direction |
| `searchTerm` | `string` | `''` | Client-side search filter |

**Initial state written to Redux:**

```ts
{
  collection,
  initted: true,
  subscribed: subscribe,
  mode: 'read',
  docs: [],
  typescript: {},
  selected: null,
  orderByField,
  orderDirection,
  searchTerm,
}
```

When `subscribe: true`, the action returns the Firestore `unsubscribe` function.

**Note on the `typescript` document:** `initCollection` treats a Firestore document with `id === 'typescript'` as the schema definition document for that collection. It is separated from the `docs` array and stored in `crud[collection].typescript`. See the [CRUD System](./crud.md) docs for details.

---

## `saveNewDoc(collection, data)`

Creates a new document in Firestore, then selects it and switches mode to `'update'`.

**Source:** `NXAdmin/actions/saveNewDoc.tsx`

```ts
import { saveNewDoc } from '@/NX/NXAdmin';

dispatch(saveNewDoc('products', {
  label: 'Widget',
  description: 'A cool widget',
  created: Date.now(),
  updated: Date.now(),
}));
```

| Parameter | Type | Description |
|---|---|---|
| `collection` | `string` | Target Firestore collection |
| `data` | `object` | Document data to save |

**Behaviour:**
1. Calls Firestore `addDoc`.
2. Merges the returned document ID into the data: `{ id: docRef.id, ...data }`.
3. Dispatches `setCRUD(collection, 'selected', newDoc)`.
4. Dispatches `setCRUD(collection, 'mode', 'update')`.
5. On error, dispatches `setCRUD(collection, 'error', msg)`.
6. Always dispatches `setCRUD(collection, 'saving', false)` in `finally`.

---

## `edit(collection, data)`

Updates an existing Firestore document and refreshes local state.

**Source:** `NXAdmin/actions/edit.tsx`

```ts
import { edit } from '@/NX/NXAdmin';

dispatch(edit('products', { id: 'abc123', label: 'Updated Widget' }));
```

---

## `collectionDelete(collection, id)`

Deletes a Firestore document from a collection.

**Source:** `NXAdmin/actions/collectionDelete.tsx`

```ts
import { collectionDelete } from '@/NX/NXAdmin';

dispatch(collectionDelete('products', 'abc123'));
```

---

## `readTypescript(collection)`

Reads the `typescript` schema document for a collection and stores it in the CRUD state.

**Source:** `NXAdmin/actions/readTypescript.tsx`

```ts
import { readTypescript } from '@/NX/NXAdmin';

dispatch(readTypescript('products'));
```

---

## `subscribeUser(uid)`

Subscribes to a user's Firestore document and keeps the Redux `paywall` slice in sync.

**Source:** `NXAdmin/actions/subscribeUser.tsx`

```ts
import { subscribeUser } from '@/NX/NXAdmin';

dispatch(subscribeUser(uid));
```

---

## `requestNotifications()`

Requests browser notification permission, obtains an FCM registration token, and persists the token to the user's Firestore document.

**Source:** `NXAdmin/actions/requestNotifications.tsx`

See the [Push Notifications](./notifications.md) document for full details.

```ts
import { requestNotifications } from '@/NX/NXAdmin';

dispatch(requestNotifications());
```

**Behaviour:**
1. Checks/requests `Notification.permission`.
2. If granted: obtains FCM token via VAPID key.
3. Posts `FIREBASE_CONFIG` message to the service worker.
4. Saves the FCM token to `users/{uid}.fcmTokens` in Firestore (using `arrayUnion`).
5. Dispatches token and permission to `nxAdmin.notifications`.

---

## `pwaAlert()`

Initialises PWA install prompt detection. Should be called once on app mount.

**Source:** `NXAdmin/actions/pwaAlert.tsx`

```ts
import { pwaAlert } from '@/NX/NXAdmin';

dispatch(pwaAlert());
```

See the [PWA Support](./pwa.md) document for full details.

---

## `triggerPwaInstall()`

Programmatically triggers the browser's native PWA install prompt.

**Source:** `NXAdmin/actions/pwaAlert.tsx`

```ts
import { triggerPwaInstall } from '@/NX/NXAdmin';

const accepted = await dispatch(triggerPwaInstall());
```

Returns `true` if the user accepted the install prompt, `false` otherwise.
