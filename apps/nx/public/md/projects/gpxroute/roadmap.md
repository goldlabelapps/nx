---
order: 9520
title: Development Roadmap & Milestones
description: NX repository documentation
icon: docs
tags: roadmap, planning, milestones
---

# Development Roadmap & Milestones

This living roadmap tracks the step-by-step assembly of **GpxRoute°** across 5 focused implementation phases.

---

## Phase 1: Core Foundation & Custom Design System
- [x] Reset repository to a clean slate while preserving `README.md`.
- [x] Establish `docs/` hub to capture architecture and the AI development journey.
- [x] Lock in technical stack (pnpm, Next.js, Redux Toolkit, Custom CSS Tokens, Mapbox, Firebase, Stripe, Resend).
- [x] Migrate root README data into `docs/design-tokens.md` and `docs/environment-variables.md`.
- [x] Initialize `package.json` with `pnpm` and install baseline dependencies (`next`, `react`, `react-dom`, `@reduxjs/toolkit`, `react-redux`, `lucide-react`, `typescript`).
- [x] Create `tsconfig.json` and `next.config.ts`.
- [x] Construct the **Custom Design System**:
  - `src/styles/tokens.css` (Brand palette, gradients, glass tokens, dark/light modes)
  - `src/styles/globals.css` (Resets, typography, layout utilities)
  - Primitives: `Button`, `Card`, `Badge`, `Modal`, `ThemeToggle` (pure CSS modules)
- [x] Setup typed Redux Toolkit store (`store/index.ts`, `hooks.ts`, initial `uiSlice`, `activitySlice`, `playbackSlice`, `userSlice`).
- [x] Create baseline `layout.tsx`, `ThemeSync.tsx`, and interactive `page.tsx` shell.

---

## Phase 2: GPX Engine & Mapbox 3D Visualization
- [x] Implement standalone GPX parser in `src/lib/gpx/gpxParser.ts` (extract coordinates, elevation, timestamp, heart rate, cadence).
- [x] Implement telemetry metrics calculator in `src/lib/geo/geoMath.ts` (distance, elevation gain/loss, pace, split segments, camera bearings).
- [x] Add Mapbox GL JS container with 3D DEM terrain extrusion (`src/components/map/MapboxView.tsx`).
- [x] Render dynamic gradient-colored route line (interpolated speed/elevation).
- [x] Implement interactive 3D camera playback controller (cinematic flythrough, play/pause, 1x/2x/5x/10x speeds, scrubber).
- [x] Build synchronized interactive elevation profile chart (`src/components/telemetry/ElevationProfile.tsx`).
- [x] Add drag-and-drop GPX file upload zone and bundled scenic demo routes (`src/components/upload/GpxDropzone.tsx`).

---

## Phase 3: Scoped Firebase Auth & Firestore Persistence
- [x] Configure Firebase Client SDK in `src/lib/firebase/firebaseClient.ts`.
- [x] Enforce single-collection Firestore architecture (`gpxroute/app/...`) in `src/lib/firebase/activityStore.ts`.
- [x] Deploy scoped Firestore security rules (`firestore.rules`).
- [x] Build user authentication modal (`src/components/auth/AuthModal.tsx` for Google & Email).
- [x] Implement user profile header menu (`src/components/auth/UserMenu.tsx`).
- [x] Implement user saved routes dashboard (`src/components/auth/SavedRoutesModal.tsx`).
- [x] Create dynamic shareable route permalink page `/r/[id]` (`src/app/r/[id]/page.tsx`).
- [x] Connect "Save & Share" action on main viewer stage to Firestore.

---

## Testing Milestone: Automated Testing Architecture
- [x] Install & configure Vitest, React Testing Library, and Playwright (`vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`).
- [x] Unit test suites for `geoMath`, `gpxParser`, and Redux slices.
- [x] Component integration test suites for UI primitives, telemetry charts, and dropzone.
- [x] Playwright multi-browser end-to-end journey tests.
- [x] Author comprehensive testing strategy guide in `docs/testing.md`.

---

## Phase 4: Social Share Cards & Resend Emails
- [x] Build client-side high-res HTML5 Canvas social card generator (`src/lib/share/socialCardGenerator.ts`):
  - 9:16 vertical poster (Instagram / TikTok Stories)
  - 16:9 landscape & 1:1 square preview cards with route path & telemetry badges
  - 1-Click PNG download
- [x] Build interactive multi-tab share modal (`src/components/share/ShareModal.tsx`):
  - Social card preview & format switcher
  - Dynamic QR code generation for mobile phone scanning
  - 1-Click permalink copying
- [x] Resend Email Integration (`src/lib/resend/emailClient.ts` & `src/app/api/email/share/route.ts`):
  - Responsive branded HTML email template
  - API endpoint for sending route invites and telemetry snapshots

---

## Phase 5: Stripe Monetization & Polish
- [x] Install `stripe` and `@stripe/stripe-js` (`src/lib/stripe/stripeServer.ts`).
- [x] Set up Stripe Checkout endpoint `/api/stripe/checkout`.
- [x] Implement Stripe webhook endpoint `/api/stripe/webhook` with signature verification.
- [x] Synchronize `isPro: true` status into Firestore `gpxroute/app/users/{userId}`.
- [x] Build `UpgradeModal.tsx` showcasing Pro perks (Ultra-HD 4K exports, exclusive 3D map skins, unlimited cloud storage).
- [x] Unit & component test coverage for Stripe checkout and Pro features (`tests/unit/stripe.test.ts`, `tests/components/pro.test.tsx`).
- [x] Final production verification (`pnpm test` and `pnpm build`).
