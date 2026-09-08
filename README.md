<div>
    <h1 style="display: flex; align-items: center; gap: 4px;">
        <a href="https://goldlabel.pro" target="_blank" rel="noreferrer" style="display: inline-flex; align-items: center;">
        <img
            src="https://goldlabel.pro/png/favicon.png"
            width="32"
            height="32"
        />
        </a>
        <span>NX° Open Source</span>
    </h1>
</div>

NX° Open Source



# NX Application — Beyond Frameworks

> A production-ready, fully typed Next.js application designed for speed, flexibility, and maintainability. It uses a config-driven architecture with shared packages and app-local composition components.

---

## 🎨 Design Architecture

This application is built on a **headless config + shared theme engine** architecture:

```
                  ┌────────────────────────────────────────────────────────┐
                  │                    apps/nx/src/config/                 │
                  │   (Brand, Hero, Navigation, Features, Videos, Docs)   │
                  └───────────────────────────┬────────────────────────────┘
                                              │ Injects typed config
                                              ▼
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                   Shared Packages + App-Local Composition Layer                           │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ • CSS & Design Tokens  : globals.css (Tailwind CSS v4 root variables & dark mode layer)  │
│ • Shared packages      : @goldlabelapps/theme, @goldlabelapps/saas               │
│ • App composition      : Header/Footer/Hero/Feature/Video/Guide components in src/       │
│ • State & Context      : local ThemeContext + AppProviders                                │
│ • Content model        : src/config/*.ts + public/md/*.md                                 │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Config-Driven UI**: Branding, copy, navigation, and metadata are centralized in `src/config/`.
2. **Composable Architecture**: Shared packages provide primitives and auth boundaries, while app components compose the final experience.
3. **Portable Application**: Copy `apps/nx`, update `src/config/`, and ship a new branded app quickly.

### Public and Authenticated Routes

The application integrates `@goldlabelapps/saas` with a cookie-based session boundary:

- Public routes include `/`, `/how-to`, `/videos`, `/blog`, and `/sign-in`.
- Authenticated routes include `/private` and `/app`, protected by session-aware middleware/guard redirects to `/sign-in`.
- The current guard checks cookie presence only; connect it to a real authentication provider before production use.

### Firebase Auth Integration (Implemented Flow)

This application enforces a protected/private route boundary using `@goldlabelapps/saas`:

- Edge middleware checks for a `__session` cookie.
- The server `AuthGuard` redirects anonymous users to `/sign-in`.

This app now wires Firebase authentication through backend session exchange:

1. Client signs in with Firebase Web SDK and gets an ID token.
2. Client sends the ID token to `POST /api/auth/session`.
3. Server verifies the ID token with Firebase Admin SDK.
4. Server creates an HTTP-only `__session` cookie.
5. Middleware + `AuthGuard` then allow access to private routes.

Sign-out flow:

1. Client calls `POST /api/auth/sign-out`.
2. Server clears the `__session` cookie.
3. Client redirects to `/sign-in` or `/`.

Important:

- `@goldlabelapps/saas` in its current state does not yet perform Firebase token verification for you.
- Keep Firebase Admin credentials server-only (`FIREBASE_*`), never exposed to browser code.
- `NEXT_PUBLIC_FIREBASE_*` values are intended for client-side Firebase initialization.

Routes added in this application:

- `src/app/api/auth/session/route.ts`: verifies Firebase ID token and sets `__session` as an HTTP-only cookie.
- `src/app/api/auth/sign-out/route.ts`: clears the `__session` cookie.
- `src/app/(auth)/sign-in/page.tsx` + `src/app/(auth)/sign-in/SignInForm.tsx`: Firebase email/password sign-in/create-account UI that calls the session route and redirects to protected routes.

Header auth UX:

- Signed out: header shows `Sign in`.
- Signed in: header replaces auth action with `Sign out` and a confirmation dialog.

---

## 🚀 Quickstart & Local Development

Run the NX development server on port **5530**:

```bash
# Start Next.js development server on http://localhost:5530
pnpm dev

# Or run via root CLI
pnpm cli dev nx

# Run unit tests (28 test suites, 95 tests)
pnpm test

# Type checking
pnpm type-check

# Production build
pnpm build
```

---

## 📁 Project Structure

```
apps/nx/
├── src/
│   ├── app/                    # Next.js 16 App Router (page.tsx, layout.tsx, /how-to, /videos)
│   ├── config/                 # Modular typed site configurations
│   │   ├── brand.config.ts     # Brand name and logo context menu settings
│   │   ├── hero.config.ts      # Headline ("Beyond Frameworks"), CTAs, particles
│   │   ├── navigation.config.ts# Header links, dropdowns, primary action
│   │   ├── features.config.ts  # Bento-style techstack & capabilities tabs
│   │   ├── solutions.config.ts # Solution tiers & pricing cards
│   │   ├── videos.config.ts    # Video showcase demos & walkthrough items
│   │   ├── blogs.config.ts     # Articles & guide teasers
│   │   ├── footer.config.ts    # Footer columns, tagline, legal links
│   │   └── index.ts            # Aggregated SiteConfig object
│   ├── components/             # App-level composition components
│   ├── context/                # Theme and provider state
│   └── lib/                    # Client utilities & markdown parser
├── public/                     # Static assets, logos, and markdown guides
├── package.json                # Defines "@goldlabelapps/theme": "workspace:*"
└── project.json                # Monorepo Nx project definition
```

---

## 🧪 Testing & Quality Gates

The application includes test suites covering all pages, metadata generation, and interactive UI components:

```bash
pnpm --dir apps/nx test
```

All assertions validate the config-driven rendering, ensuring dynamic and reliable runtime behavior.


