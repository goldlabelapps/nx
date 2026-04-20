## NX°

Modern, full-stack web application framework and platform built on [Next.js](https://nextjs.org/) and [React](https://react.dev/). NX° is an opinionated meta-framework designed as a production-ready starting point for building scalable, modular, multi-tenant PWAs — without starting from scratch.

In this Open Source release we offer a public repo. Production ready and fully documented, it allows a fullstack JavaScript developer to spin up a fully functioning Firebase powered NX° instance within 30 minutes.

![NX°](public/shared/png/opengraph/apps.png)

#### Features

- **Next.js 16**: SSR, SSG, API routes, and advanced App Router
- **TypeScript**: Strict typing and modern JavaScript throughout
- **Material UI (MUI)**: Beautiful, accessible UI components with theming
- **Redux Toolkit (Uberedux)**: Flexible, schema-free global state management
- **Firebase**: Authentication and backend integration
- **PWA Support**: Offline-ready with service workers and aggressive caching
- **Multi-Tenant Architecture**: Easily support multiple brands/clients from a single codebase
- **Markdown-as-CMS**: All content managed as `.md` files — no database required
- **RESTful API**: Built-in API endpoints ([API Docs](https://goldlabel.pro/api))
- **Design System**: Reusable components, icons, and hooks
- **Flash Animation Engine**: GSAP-powered animation system with MovieClips and ActionScript controllers
- **Shortcodes**: MDX-style custom components embeddable in Markdown content
- **Rich Media Support**: Markdown, Mapbox maps, Recharts, images, SVG, PDF, and more

#### Quick Start

1. **Clone the repository:**
	```bash
	git clone https://github.com/goldlabelapps/nx
	cd nx
	```
2. **Configure environment:**
	```bash
	cp .env.example .env.local
	# Set NEXT_PUBLIC_TENANT=free (or your tenant name)
	```
3. **Install dependencies:**
	```bash
	yarn install
	```
4. **Run the development server:**
	```bash
	yarn dev
	```

The app will be available at [http://localhost:1999](http://localhost:1999).

NX° exposes a RESTful API under `/api`. See [app/api/README.md](app/api/README.md) for details and [live API docs](https://github.com/goldlabelapps/python-nx-ai).

#### Tech Stack

| Technology | Role |
|||
| [Next.js 16](https://nextjs.org/) | Core framework — SSR, SSG, API routes, App Router |
| [React 19](https://react.dev/) | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | Strict typing throughout |
| [Material UI (MUI) v7](https://mui.com/) | Component library & theming |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management |
| [Firebase](https://firebase.google.com/) | Authentication & backend |
| [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/) | Map rendering |
| [GSAP](https://greensock.com/gsap/) | Animation engine |
| [Recharts](https://recharts.org/) | Data visualization |
| [Resend](https://resend.com/) | Email sending |
| [FingerprintJS](https://fingerprint.com/) | Visitor fingerprinting |
| [PWA](https://web.dev/progressive-web-apps/) | Service workers & offline support |

#### Codebase Structure

```
/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root layout — reads config.json, wraps in UbereduxProvider
│   ├── globals.css             # Global styles
│   ├── not-found.tsx           # 404 page
│   ├── [[...slug]]/            # Single catch-all route — renders ALL content pages
│   │   └── page.tsx            # Resolves tenant, fetches markdown, builds page
│   ├── api/                    # REST API route handlers
│   │   ├── route.ts
│   │   └── lib/                # Utilities: makeRes, makeTime, getEndpoints, getBaseurl
│   └── NX/                     # The NX° framework core
│       ├── NX.tsx              # Root <NX> component — applies theme, wraps DesignSystem
│       ├── types.d.ts          # All shared TypeScript types
│       ├── lib/                # Server-side utilities
│       │   ├── serverHooks/    # Server-only data fetching hooks
│       │   │   ├── serverUseNav.ts       # Builds nav tree from markdown folder structure
│       │   │   ├── serverUseMDBySlug.ts  # Resolves markdown file from URL slug
│       │   │   ├── serverUseAllMd.ts     # Enumerates all markdown files (for static params)
│       │   │   ├── serverUseRelated.ts   # Finds related content
│       │   │   └── serverUseSlugs.ts     # Generates slug list
│       │   ├── getTenant.tsx   # Resolves tenant config + markdown directory
│       │   └── getMeta.tsx     # Builds Next.js Metadata object
│       ├── DesignSystem/       # MUI-based design system cartridge
│       │   ├── DesignSystem.tsx         # ThemeProvider wrapper
│       │   ├── components/             # UI components (Header, Footer, Hero, Nav, TreeNav, Icon, Forms...)
│       │   ├── hooks/          # Client hooks: useDesignSystem, useMUITheme, useFeedback...
│       │   └── actions/        # Redux actions: setDesignSystem, setFeedback, navigateTo...
│       ├── Uberedux/           # Redux state management cartridge
│       │   ├── store.ts        # Redux store with single dynamic slice
│       │   ├── UbereduxProvider.tsx     # Provider wrapping the app
│       │   └── hooks/          # useDispatch, useSlice
│       ├── Flash/              # GSAP animation system
│       │   ├── Flash.tsx                # Main animation stage
│       │   ├── ActionScript/            # Animation controller logic
│       │   └── MovieClips/              # Animated components (icons, letters, text, chatbot...)
│       ├── Shortcodes/         # MDX-style shortcode components for Markdown
│       │   └── components/     # RenderMarkdown, PageLink, ContentCard, AIExample, BuyNow...
│       └── Virus/              # Special full-page interactive cartridge
└── public/                     # Static assets & per-tenant data
    ├── free/                   # "free" tenant (default)
    │   ├── config.json         # Tenant config (branding, theme, cartridges)
    │   ├── manifest.json       # PWA manifest
    │   └── markdown/           # All content as Markdown files
    │       ├── index.md        # Home page
    │       └── features/, examples/, techstack/, help/
    └── shared/                 # Shared assets (images, SVGs, fonts, PDFs)
```



#### Architecture

**Multi-Tenant**

Every deployment targets a tenant set via the `NEXT_PUBLIC_TENANT` environment variable. Each tenant lives in `public/<tenant>/` and provides a `config.json` (branding, theme colors, enabled cartridges) and a `markdown/` directory for all content.

**Markdown-as-CMS**

All page content is stored as Markdown files with YAML frontmatter. A single Next.js catch-all route (`[[...slug]]/page.tsx`) resolves every URL to a markdown file, renders it, and generates all static pages at build time via `generateStaticParams()`. The navigation tree is automatically built from the folder structure of the markdown directory.

**Cartridges**

Features are enabled per-tenant via `cartridges` in `config.json`:
- `designSystem` — theme colors, light/dark mode
- `paywall` — access control
- `lingua` — internationalisation
- `echoPay` — payments
- `images` — Flickr gallery integration

**Uberedux**

A single Redux slice handles all client state via dot-notation keys (e.g. `"designSystem.themeMode"`). This generic, schema-free state system allows all cartridges and components to share state without boilerplate.

**Shortcodes**

Markdown content supports custom shortcode syntax that renders as React components:
```md
[PageLink icon="rocket" title="Get started" url="/help"]
[CleverText text="Ready to create an NX° app?"]
```

**Page Request Flow**

```
URL → [[...slug]]/page.tsx
  → getTenant()          reads config.json for active tenant
  → serverUseMDBySlug()  resolves .md file from slug
  → gray-matter          parses frontmatter + content
  → serverUseNav()       builds nav tree from /markdown folder structure
  → <NX config>          applies MUI theme via DesignSystem
  → <Header> <TreeNav> <Hero> <RenderMarkdown> <Footer>
```



#### Scripts

| Command | Description |
|||
| `yarn dev` | Start development server at port 1999 |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn clean` | Clean build artifacts |



#### Contributing

Contributions are welcome! Please open issues or submit pull requests.
For major changes, open an issue first to discuss what you would like to change.



#### License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.



#### Owner

NX° is built and maintained by [Goldlabel Apps Ltd](https://goldlabel.pro). 