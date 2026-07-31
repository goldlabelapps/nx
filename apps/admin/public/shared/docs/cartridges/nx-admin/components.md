# NX° Admin — Components Reference

All components are exported from `app/NX/NXAdmin/index.tsx`.

---

## Layout Components

### `<NXAdmin>`

The root cartridge component. Handles auth state, theming, and renders either the sign-in screen or the admin shell.

**Source:** `NXAdmin/NXAdmin.tsx`

```tsx
import { NXAdmin } from '@/NX/NXAdmin';

<NXAdmin config={config} />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `config` | `T_Config` | ✓ | Application configuration |

**Behaviour:**
- Mounts `useFirebaseAuthListener()` to track auth state.
- On auth, dispatches `requestNotifications()` to set up FCM.
- Shows `<SimpleSignIn>` when unauthenticated.
- Shows `<MiniDrawer>` when authenticated.

---

### `<MiniDrawer>`

The main admin shell. Renders the fixed top app bar, collapsible left drawer, and the main content area.

**Source:** `NXAdmin/components/Layout/MiniDrawer.tsx`

```tsx
import { MiniDrawer } from '@/NX/NXAdmin';

<MiniDrawer config={config} />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `config` | `any` | ✓ | Application configuration |

**Behaviour:**
- Derives `active` from the URL pathname on mount and on navigation.
- Opens/closes the drawer automatically based on `md` breakpoint.
- Calls `pwaAlert()` once on mount.
- Calls `useNotifications()` to listen for foreground FCM messages.

---

### `<Header>`

Renders the page-level title and icon in the top app bar, sourced from `nxAdmin.header` in Redux.

**Source:** `NXAdmin/components/Layout/Header.tsx`

```tsx
import { Header } from '@/NX/NXAdmin';

<Header />
```

No props. Reads from Redux: `state.redux.nxAdmin.header`.

---

### `<LeftDrawer>`

The navigation sidebar contents. Renders the account menu and navigation links.

**Source:** `NXAdmin/components/Layout/LeftDrawer.tsx`

```tsx
import { LeftDrawer } from '@/NX/NXAdmin';

<LeftDrawer />
```

No props. Built-in navigation links:
- NX° Admin (dashboard `/`)
- Accounts° (`/accounts`)
- Prospects° (`/prospects`)
- Viruses° (`/virus`)
- Fingerprints° (`/fingerprints`)

---

### `<PageRouter>`

Renders the correct page component based on the `active` route key.

**Source:** `NXAdmin/components/PageRouter.tsx`

```tsx
import { PageRouter } from '@/NX/NXAdmin';

<PageRouter active={active} />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `active` | `string \| null` | ✓ | Current route key. `null` renders `<MegaDash>` |

---

## Page Components

### `<MegaDash>`

The default dashboard landing page. Displays a virus surface and prospect surface summary.

**Source:** `NXAdmin/components/MegaDash/MegaDash.tsx`

```tsx
import { MegaDash } from '@/NX/NXAdmin';

<MegaDash />
```

No props. On mount calls `initDash()` if not already initialised.

---

### `<Collection>`

A generic, self-contained CRUD manager for any Firestore collection. Handles its own data fetching, state management, and switching between read/create/update/delete modes.

**Source:** `NXAdmin/components/Collection/Collection.tsx`

```tsx
import { Collection } from '@/NX/NXAdmin';

<Collection
  collection="products"
  title="Products"
  description="Manage your product catalogue"
  icon="products"
  single="Product"
  btnMode="icon"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `collection` | `string` | — | Firestore collection name |
| `title` | `string` | — | Display title (plural) |
| `description` | `string` | — | Short description |
| `icon` | `string` | — | Icon key from `I_Icon` |
| `single` | `string` | — | Singular label (used in create/update titles) |
| `btnMode` | `'icon' \| 'button'` | `'icon'` | Controls TypeScript panel button style |

**Behaviour:**
- When not active: renders as a compact icon button.
- When active: expands to a full card with CRUD controls.
- Automatically calls `initCollection(collection)` on first render.
- Delegates to `<ReadDoc>`, `<CreateDoc>`, `<UpdateDoc>`, `<DeleteDoc>` based on `mode`.

---

### `<Accounts>`

Displays a list of registered user accounts from Firestore.

```tsx
import { Accounts } from '@/NX/NXAdmin';
<Accounts />
```

---

### `<Prospects>` / `<Prospect>`

Prospect list and individual prospect detail view.

```tsx
import { Prospects, Prospect } from '@/NX/NXAdmin';
<Prospects />
<Prospect />
```

---

### `<Avatars>`

Avatar management page.

```tsx
import { Avatars } from '@/NX/NXAdmin';
<Avatars />
```

---

### `<Queue>` / `<FilterSelect>`

Job/task queue management page with filter controls.

```tsx
import { Queue, FilterSelect } from '@/NX/NXAdmin';
<Queue />
<FilterSelect />
```

---

### `<Viruses>`

Virus/threat monitoring page.

```tsx
import { Viruses } from '@/NX/NXAdmin';
<Viruses />
```

---

### `<Fingerprints>`

Device fingerprint management page.

```tsx
import { Fingerprints } from '@/NX/NXAdmin';
<Fingerprints />
```

---

## CRUD Components

See the [CRUD System](./crud.md) document for full details. The four components below are used internally by `<Collection>` but can also be used standalone.

### `<CreateDoc>`

Form for creating a new Firestore document. Renders input fields dynamically from the collection's `typescript` schema document.

```tsx
import { CreateDoc } from '@/NX/NXAdmin';
<CreateDoc collection="products" icon="products" />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `collection` | `string` | ✓ | Target Firestore collection |
| `icon` | `string` | — | Icon key for the document |

---

### `<ReadDoc>`

Renders a list of documents in a collection as selectable list items.

```tsx
import { ReadDoc } from '@/NX/NXAdmin';
<ReadDoc collection="products" />
```

Clicking an item dispatches `setCRUD(collection, 'selected', doc)` and sets mode to `'update'`.

---

### `<UpdateDoc>`

Edit form for the currently selected document.

```tsx
import { UpdateDoc } from '@/NX/NXAdmin';
<UpdateDoc collection="products" />
```

---

### `<DeleteDoc>`

Confirmation UI for deleting the currently selected document.

```tsx
import { DeleteDoc } from '@/NX/NXAdmin';
<DeleteDoc collection="products" />
```

---

## Menu Components

### `<NXAdminMenu>`

Account dropdown menu containing navigation, theme toggle, and sign-out.

```tsx
import { NXAdminMenu } from '@/NX/NXAdmin';
<NXAdminMenu />
```

**Menu items:** Account, Dark/Light mode toggle, Sign out.

---

### `<MiniListItem>`

A single navigation list item used inside the drawer and menus.

```tsx
import { MiniListItem } from '@/NX/NXAdmin';

<MiniListItem
  open={true}
  onClick={navigateToRoute}
  options={{
    label: 'Accounts',
    icon: 'account',
    route: '/accounts',
  }}
/>
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `open` | `boolean` | ✓ | Whether the drawer is expanded |
| `onClick` | `(route?: string) => void` | ✓ | Click handler |
| `options.label` | `string` | ✓ | Display label |
| `options.icon` | `string` | ✓ | Icon key |
| `options.route` | `string` | — | Route to navigate to |

---

### `<NotificationBell>`

Bell icon button showing the unread notification count badge. Clicking it requests notification permission if not yet granted, or clears the badge if already granted.

```tsx
import { NotificationBell } from '@/NX/NXAdmin';
<NotificationBell />
```

Reads from `state.redux.nxAdmin.notifications`.

---

### `<PWAAlert>`

Renders a prompt to install the app as a PWA. Shown automatically when the browser fires `beforeinstallprompt`.

```tsx
import { PWAAlert } from '@/NX/NXAdmin';
<PWAAlert />
```

---

### `<NXAdminBtn>` / `<CloseAdmin>` / `<CancelActive>`

Utility menu buttons for opening the admin panel, closing it, and cancelling the active selection respectively.

---

### `<AccountCard>`

Displays the current user's name, email, and avatar. Used inside `<NXAdminMenu>`.

---

## UI Primitives

### `<InputString>`

A labelled MUI text field with optional email validation.

```tsx
import { InputString } from '@/NX/NXAdmin';

<InputString
  label="Email"
  field="email"
  type="email"
  description="User's email address"
  autoFocus
  onChange={(value) => console.log(value)}
  disabled={false}
/>
```

---

### `<OptionSelect>`

A labelled MUI select/dropdown.

```tsx
import { OptionSelect } from '@/NX/NXAdmin';
```

---

### `<JSONInput>`

A raw JSON editor field.

```tsx
import { JSONInput } from '@/NX/NXAdmin';
```

---

### `<SoundPlayer>`

A hidden audio player component used for notification sounds.

```tsx
import { SoundPlayer } from '@/NX/NXAdmin';
```

---

### `<TypeScript>`

Displays and manages the TypeScript schema document for a collection, allowing administrators to define collection field types.

```tsx
import { TypeScript } from '@/NX/NXAdmin';

<TypeScript
  collection="products"
  typescript={typescriptDoc}
  cardSubheader="Manage product fields"
  btnMode="icon"
/>
```
