# NX° Framework — Uberedux (State Management)

Uberedux is NX°'s shared Redux layer. It wraps Redux Toolkit's `configureStore` with a single, dot-notation-addressable slice, giving every cartridge a simple, consistent way to read and write global state without boilerplate.

---

## Philosophy

Instead of separate reducers for every cartridge, Uberedux uses a **single flat slice** (`redux`) with a generic `setUbereduxKey` action that accepts a dot-separated key path and a value. This means:

- No need to write reducers or action creators per cartridge.
- Cartridges namespace themselves by convention (e.g. `nxAdmin`, `paywall`, `designSystem`).
- Selectors are simple `state.redux.<namespace>` reads.

---

## Store Structure

```
store.getState()
└── redux: {
      nxAdmin: { … },        // NX° Admin cartridge state
      paywall: { … },        // Paywall / auth cartridge state
      designSystem: { … },   // Theme state
      error: string | null,  // Global last-error string
      …                      // Any cartridge can add its own key
    }
```

---

## API

### `UbereduxProvider`

Wraps the application with the Redux `<Provider>`. Place it at the root of your component tree, outside all cartridges.

```tsx
import { UbereduxProvider } from '@/NX/Uberedux';

export default function RootLayout({ children }) {
  return (
    <UbereduxProvider>
      {children}
    </UbereduxProvider>
  );
}
```

---

### `setUbereduxKey({ key, value })`

The single Redux action used to write to the store. The `key` is a dot-separated path into `state.redux`.

```ts
import { setUbereduxKey } from '@/NX/Uberedux';

// Write a top-level key
dispatch(setUbereduxKey({ key: 'nxAdmin', value: { active: 'accounts' } }));

// Write a nested key (dot notation)
dispatch(setUbereduxKey({ key: 'nxAdmin.notifications.unreadCount', value: 5 }));
```

Intermediate objects are created automatically if they don't exist.

---

### `resetUberedux()`

Resets the entire store to its initial empty state. Useful on sign-out.

```ts
import { resetUberedux } from '@/NX/Uberedux';

dispatch(resetUberedux());
```

---

### `useDispatch()`

Type-safe wrapper around `react-redux`'s `useDispatch` hook. Always use this version rather than importing from `react-redux` directly so that thunk-based actions resolve correctly.

```tsx
import { useDispatch } from '@/NX/Uberedux';

function MyComponent() {
  const dispatch = useDispatch();
  // dispatch can accept plain actions or async thunks
}
```

---

### `useSlice(key)`

Selects an arbitrary top-level key from `state.redux`.

```tsx
import { useSlice } from '@/NX/Uberedux';

function MyComponent() {
  const nxAdmin = useSlice('nxAdmin');
}
```

---

## Writing a Cartridge Action

All cartridge actions follow the same thunk pattern:

```ts
import type { Dispatch } from 'redux';
import { setUbereduxKey } from '@/NX/Uberedux';

export const myAction = (payload: string): any =>
  async (dispatch: Dispatch, getState: () => any) => {
    try {
      const state = getState();
      const current = state?.redux?.myCartridge || {};
      dispatch(setUbereduxKey({ key: 'myCartridge', value: { ...current, data: payload } }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
```

---

## TypeScript Types

| Type | Description |
|---|---|
| `T_RootState` | Full store type — `ReturnType<typeof store.getState>` |
| `T_UbereduxDispatch` | Dispatch type including thunk middleware |

```ts
import type { T_RootState, T_UbereduxDispatch } from '@/NX/Uberedux/store';
```
