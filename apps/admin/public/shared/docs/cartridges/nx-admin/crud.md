# NX° Admin — CRUD System

The NX° Admin CRUD system provides a zero-configuration, schema-driven way to manage any Firestore collection through a familiar Create / Read / Update / Delete interface.

---

## Overview

Each collection managed by NX° Admin gets its own isolated state entry in `state.redux.nxAdmin.crud[collectionName]`. The system is driven by a **TypeScript schema document** — a special Firestore document named `typescript` within each collection — that describes the fields, their types, labels, and validation rules.

---

## The TypeScript Schema Document

For each Firestore collection you want to manage, create a document with the ID `typescript`. Its fields describe the data shape of other documents in that collection.

### Schema document structure

```json
{
  "typeName": "Product",
  "fieldName": {
    "type": "string",
    "label": "Product Name",
    "description": "The display name for this product",
    "required": true,
    "order": 1
  },
  "email": {
    "type": "email",
    "label": "Contact Email",
    "description": "Primary contact email",
    "required": true,
    "order": 2
  },
  "status": {
    "type": "select",
    "label": "Status",
    "options": ["active", "inactive"],
    "required": false,
    "order": 3
  }
}
```

### Supported field types

| Type | Input component | Validation |
|---|---|---|
| `string` | `<InputString>` | Minimum 1 character |
| `email` | `<InputString type="email">` | RFC-format email regex |
| `select` | `<OptionSelect>` | Must match one of `options` |

### Reserved field names

The following field names are not rendered as form inputs and are managed automatically:

| Field | Description |
|---|---|
| `typeName` | The singular display name of the collection item |
| `id` | Firestore document ID (set automatically) |
| `typescript` | Self-reference guard |
| `created` | Unix timestamp set on create (`Date.now()`) |
| `updated` | Unix timestamp set on every save (`Date.now()`) |
| `label` | Auto-populated from the first required field |
| `description` | Auto-populated from the second required field |

---

## Using the `<Collection>` Component

The simplest way to use the CRUD system is via the `<Collection>` component, which orchestrates all four CRUD modes automatically.

```tsx
import { Collection } from '@/NX/NXAdmin';

<Collection
  collection="products"
  title="Products"
  description="Manage your product catalogue"
  icon="products"
  single="Product"
/>
```

`<Collection>` handles:
- Calling `initCollection` on first render
- Showing mode-appropriate sub-components (`ReadDoc`, `CreateDoc`, `UpdateDoc`, `DeleteDoc`)
- Header text changes based on mode
- "New" button (only shown when not in create mode)
- TypeScript schema viewer/editor

---

## CRUD Mode Flow

```
                    ┌─────────────┐
              ┌────►│    READ      │◄────┐
              │     │ (list docs)  │     │
              │     └──────┬───────┘     │
              │            │             │
       cancel │     select │       cancel│
              │            ▼             │
              │     ┌─────────────┐      │
              │     │   UPDATE    │      │
              │     │ (edit doc)  │      │
              │     └──────┬───────┘     │
              │            │             │
              │      click │"New"        │
              │            ▼             │
              │     ┌─────────────┐      │
              └─────│   CREATE    │      │
                    │ (new form)  │      │
                    └─────────────┘      │
                                         │
                    ┌─────────────┐      │
                    │   DELETE    │──────┘
                    │ (confirm)   │
                    └─────────────┘
```

### Switching modes programmatically

```ts
import { setCRUD } from '@/NX/NXAdmin';

// Switch to create mode
dispatch(setCRUD('products', 'mode', 'create'));

// Switch back to read mode and clear selection
dispatch(setCRUD('products', 'mode', 'read'));
dispatch(setCRUD('products', 'selected', null));
```

---

## `initCollection` — Data Fetching

`initCollection` initialises the Redux state for a collection and fetches documents.

### Real-time subscription (default)

```ts
dispatch(initCollection('products'));
// Firestore onSnapshot is active — docs update automatically
```

### One-time fetch

```ts
dispatch(initCollection('products', { subscribe: false }));
```

### With ordering and search

```ts
dispatch(initCollection('products', {
  orderByField: 'created',
  orderDirection: 'desc',
  searchTerm: 'widget',
}));
```

### Client-side search

The search filter runs client-side on the following fields (normalised, diacritics stripped):

- `id`
- `name`, `fullname`, `fullName`, `full_name`
- `first_name` + `last_name` (joined)
- `firstName` + `lastName` (joined)
- `email`
- `company`

---

## Standalone CRUD Components

You can use the four CRUD components directly without `<Collection>` if you need custom layout.

### `<CreateDoc collection="…" />`

Renders the create form based on the TypeScript schema. On save, calls `saveNewDoc` which:
1. Calls Firestore `addDoc`.
2. Sets `label` from the first required field value.
3. Sets `description` from the second required field value.
4. Stamps `created` and `updated` with `Date.now()`.
5. Switches mode to `'update'` on success.

### `<ReadDoc collection="…" />`

Renders a list of docs as `<ListItemButton>` elements. Clicking sets `selected` and switches to `'update'`.

### `<UpdateDoc collection="…" />`

Renders a pre-filled edit form for `crud[collection].selected`. On save, calls `edit`.

### `<DeleteDoc collection="…" />`

Confirmation dialog. On confirm, calls `collectionDelete`.

---

## Building a Custom Collection Page

```tsx
'use client';
import React from 'react';
import { useDispatch } from '@/NX/Uberedux';
import {
  initCollection,
  useCollection,
  setCRUD,
  ReadDoc,
  CreateDoc,
} from '@/NX/NXAdmin';

export default function CustomPage() {
  const dispatch = useDispatch();
  const collectionState = useCollection('widgets');
  const state = collectionState?.widgets;

  React.useEffect(() => {
    if (!state?.initted) {
      dispatch(initCollection('widgets', { orderByField: 'created', orderDirection: 'desc' }));
    }
  }, [dispatch, state?.initted]);

  const { mode } = state || {};

  return (
    <div>
      {mode === 'read' && <ReadDoc collection="widgets" />}
      {mode === 'create' && <CreateDoc collection="widgets" />}
      <button onClick={() => dispatch(setCRUD('widgets', 'mode', 'create'))}>
        New Widget
      </button>
    </div>
  );
}
```
