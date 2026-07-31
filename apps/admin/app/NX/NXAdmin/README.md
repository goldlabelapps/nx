# NX° Admin

> Modular admin surface for managing app data, operations, and internal tools.

NX° Admin is a modular, extensible admin cartridge for React apps. It provides a top-level admin component, a barrel export for all features, and a folder structure supporting scalable feature modules (Prospects, Queue, Fingerprints, MegaDash, etc). All major admin functionality is exported from [index.tsx](index.tsx).

## Primary Entry Points

- [NXAdmin.tsx](NXAdmin.tsx): Main admin component
- [index.tsx](index.tsx): Barrel export for all modules, actions, hooks, and UI

## Core Responsibilities

- Render an authenticated admin experience
- Switch between desktop and mobile admin layouts
- Expose modular feature pages (Prospects, Queue, Fingerprints, MegaDash, etc)
- Provide reusable CRUD building blocks
- Centralize admin actions and hooks

## High-Level Flow

1. NXAdmin mounts and initializes auth listeners
2. Renders nothing if auth is not ready
3. Renders sign-in if user is not authenticated
4. Renders desktop or mobile layout if authenticated
5. Routes and composes admin features from exported modules

See [NXAdmin.tsx](NXAdmin.tsx) for implementation details.

## Public Surface (Barrel Exports)

All exports are available from [index.tsx](index.tsx):

### Main

- NXAdmin
- MegaDash

### Layout

- DesktopLayout
- MobileLayout
- Header
- PageRouter
- AdminNav


### Page Modules

- Prospects
- Queue
- Fingerprints
- MegaDash
- FilterSelect

### UI Components

- InputString
- OptionSelect
- JSONInput
- SoundPlayer

### Menu Components

- NXAdminBtn
- NXAdminMenu
- CloseAdmin
- CancelActive
- MiniListItem
- AccountCard
- PWAAlert
- NotificationBell

### Actions

- setNXAdmin
- setCRUD
- saveNewDoc
- edit
- initCollection
- collectionDelete
- readTypescript
- subscribeUser
- pwaAlert
- triggerPwaInstall
- requestNotifications


### Hooks

- useNXAdmin
- useCRUD
- useCollection
- useActive
- useNotifications
- useHeader


## Folder Map

- [components/](components): Feature modules and UI (Fingerprints, Prospects, Queue, MegaDash, Layout, Menus, UI)
	- [Fingerprints/](components/Fingerprints): Fingerprint admin module (actions, hooks, utils, components)
	- [Prospects/](components/Prospects): Prospects admin module (actions, hooks, utils, components)
	- [Queue/](components/Queue): Queue admin module (actions, hooks, prompts, components)
	- [MegaDash/](components/MegaDash): Dashboard module
	- [Layout/](components/Layout): Layout and navigation components
	- [Menus/](components/Menus): Menu and navigation UI
	- [UI/](components/UI): Shared UI widgets
- [actions/](actions): Top-level admin actions (CRUD, collection, notifications, etc)
- [hooks/](hooks): Top-level reusable admin hooks
- [types.d.ts](types.d.ts): Shared admin type definitions


## Type Strategy

Admin-wide types are centralized in [types.d.ts](types.d.ts). Feature modules import shared types from this file. Naming conventions:

- Interface names: `I_...`
- Type aliases: `T_...`


## Typical Integration Pattern

1. Import from the NXAdmin barrel:
	```js
	import { NXAdmin, Prospects, useCRUD } from '.../NXAdmin';
	```
2. Render `<NXAdmin />` with a valid config object
3. NXAdmin handles auth and layout switching
4. Use exported actions/hooks/components to build custom admin flows


## Extending & Customizing

- Add new feature modules under `components/`
- Use the barrel export in `index.tsx` to expose new actions, hooks, or UI
- Follow the folder conventions for actions, hooks, utils, and components

## Notes

- TypeScript-first: all modules and types are in TS/TSX
- Prompts for AI/LLM integrations are in `components/Queue/prompts/`
- No "Viruses" module currently present
- For details, see each feature module's README or index file
