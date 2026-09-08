---
order: 9516
title: Technical Architecture & Stack Strategy
description: NX repository documentation
icon: docs
tags: gpxroute, architecture, nextjs
---

# Technical Architecture & Stack Strategy

## 1. System Architectural Overview

**GpxRoute°** is architected as a modular, client-first geospatial web application powered by **Next.js (App Router)** and deployed to **Vercel**. It uses **Redux Toolkit** for unified state management across the map engine, telemetry graphs, and user sessions, alongside a **Bespoke Swiss Minimalist CSS Token Design System** (zero utility framework bloat, strict 0px geometry).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client Presentation                           │
│  Next.js (App Router, React 19) + Swiss Minimalist CSS Design System    │
├─────────────────────────────────────────────────────────────────────────┤
│                               State Layer                               │
│     Redux Toolkit (activitySlice, playbackSlice, userSlice, uiSlice)    │
├─────────────────────────────────────────────────────────────────────────┤
│        Geospatial Engine        │          Telemetry & Charts           │
│   Mapbox GL JS (3D DEM Terrain) │    Interactive Canvas/SVG Charts      │
│   Turf.js / geoMath Engine      │    Synchronized Route Scrubber        │
├─────────────────────────────────────────────────────────────────────────┤
│                       Backend & Cloud Services                          │
│   Firebase Auth + Firestore     │    Stripe Payments & Webhooks         │
│   (Scoped under gpxroute/app)   │    Resend Email Engine                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Scoped Firestore Architecture (`gpxroute/app/...`)

To guarantee zero collection namespace collisions in shared multi-tenant Firebase projects, **all data for GpxRoute° is encapsulated beneath a single root collection called `gpxroute`** with a root anchor document `app`:

```
📁 Firestore Root
└── 📁 gpxroute (The single root collection for this project)
    └── 📄 app (Root Anchor Doc)
        ├── 📁 activities/{activityId}   ➔ Saved GPX tracks, points & telemetry
        └── 📁 users/{userId}            ➔ User accounts, Pro status & preferences
```

---

## 3. Stripe Payments & Webhooks Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User Clicks "Upgrade to Pro"                             │
│    Client POSTs to /api/stripe/checkout                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Stripe Checkout Session Created                          │
│    Redirects to Stripe hosted checkout page                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Payment Completed ➔ Stripe Dispatches Webhook            │
│    POST /api/stripe/webhook (HMAC Signature Verified)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Firestore User Doc Updated (gpxroute/app/users/{userId}) │
│    { isPro: true, stripeCustomerId, stripeSubscriptionId }  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Locked-In Technology Stack

| Layer | Technology | Rationale & Responsibilities |
| :--- | :--- | :--- |
| **Package Manager** | `pnpm` | Ultra-fast installation, strict dependency isolation, clean lockfile management. |
| **Core Framework** | `Next.js 16` (App Router, TypeScript) | Hybrid SSR/client rendering, zero-config Vercel deployment, edge-ready API routes. |
| **State Management** | `Redux Toolkit` + `react-redux` | Predictable, typed global store managing parsed tracks, 3D camera playback, scrubber time, and auth states. |
| **Styling & UI System** | **Swiss Modernist CSS Tokens** (CSS Modules) | Pure CSS tokens in `tokens.css` with 0px sharp geometry and high-contrast palette. |
| **Geospatial & 3D Maps** | `Mapbox GL JS` (`mapbox-gl`) | Real-time 3D terrain rendering (`mapbox-terrain-dem-v1`), camera pitch/bearing flyovers, gradient-colored line layers. |
| **Geospatial Processing** | Custom GPX DOMParser + `geoMath.ts` | Fast XML parsing, elevation smoothing, speed/distance calculation, camera bearing math. |
| **Authentication & DB** | `Firebase Auth` + `Cloud Firestore` | User accounts (Google/Email), activity document persistence strictly under `gpxroute/app/...`. |
| **Payments** | `Stripe` | Checkout sessions and webhook listeners for Pro tier subscriptions. |
| **Email Delivery** | `Resend` | Transactional receipt delivery and activity share email invitations. |
| **Social Generator** | HTML5 Canvas Engine | Exportable 9:16 Story, 16:9 Landscape, 1:1 Square posters. |
| **Automated Testing** | `Vitest`, `RTL`, `Playwright` | 100% unit, component, and E2E browser test coverage. |
