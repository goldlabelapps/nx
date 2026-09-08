---
order: 9518
title: Testing Strategy & Architecture
description: NX repository documentation
icon: docs
tags: gpxroute, testing, quality
---

# Testing Strategy & Architecture

This document provides a complete guide to the automated testing infrastructure in **GpxRoute°**, covering Unit Testing, Component Integration Testing, and End-to-End (E2E) Browser Journeys.

---

## 1. Testing Philosophy & Stack

```
┌─────────────────────────────────────────────────────────────┐
│ 1. End-to-End (E2E) Testing (Playwright)                    │
│    Cross-browser full user flows, 3D Mapbox stage, HUD,     │
│    modals, playback controls, and theme switching           │
├─────────────────────────────────────────────────────────────┤
│ 2. Component & UI Integration (React Testing Library)       │
│    Design System primitives (Button, Card, Badge, Modal),   │
│    Elevation Profile, Telemetry HUD, Dropzone               │
├─────────────────────────────────────────────────────────────┤
│ 3. Domain & Math Unit Testing (Vitest)                      │
│    Haversine distance, bearings, elevation smoothing,       │
│    GPX XML parser, splits, Redux Toolkit state slices       │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Tools | Scope & Focus |
| :--- | :--- | :--- |
| **Unit Testing** | `Vitest`, `jsdom` | Pure business logic, geospatial math formulas, GPX parser, Redux slice reducers. |
| **Component Testing** | `React Testing Library`, `@testing-library/jest-dom` | User event handling, accessibility attributes, DOM updates, Redux provider integration. |
| **End-to-End Testing** | `Playwright` (`@playwright/test`) | Real browser testing across Chromium, WebKit (Safari), and Mobile Chrome against live dev server. |

---

## 2. Test Suites Directory Structure

```
tests/
├── unit/
│   ├── geoMath.test.ts        # Haversine distance, compass bearings, telemetry smoothing, splits
│   ├── gpxParser.test.ts      # GPX 1.0/1.1 XML parsing, Garmin extensions, error cases
│   └── reduxSlices.test.ts    # activitySlice, playbackSlice, uiSlice, userSlice reducers
├── components/
│   ├── designSystem.test.tsx  # Button, Card, Badge, Modal, ThemeToggle primitives
│   ├── telemetry.test.tsx     # TelemetryHUD, ElevationProfile, PlaybackControls
│   └── upload.test.tsx        # GpxDropzone and demo track selection
├── e2e/
│   └── app-journey.spec.ts    # Full user journey (playback, camera modes, theme toggle, presets)
├── testUtils.tsx              # Redux Provider test render wrapper
├── vitest.config.ts           # Vitest config with JSDOM environment & path aliases
├── vitest.setup.ts            # DOM, Canvas 2D, and ResizeObserver stubs
└── playwright.config.ts       # Multi-browser Playwright config
```

---

## 3. Running Tests

### Unit & Component Integration Tests
Run all unit and component tests once:
```bash
pnpm test
```

Run in interactive watch mode:
```bash
pnpm test:watch
```

Run with code coverage reporting:
```bash
pnpm exec vitest run --coverage
```

### End-to-End (E2E) Browser Tests
Run full Playwright test suite across all browsers:
```bash
pnpm test:e2e
```

Run Playwright with UI test runner:
```bash
pnpm exec playwright test --ui
```

---

## 4. Key Test Coverage Areas

### Geospatial Calculations (`tests/unit/geoMath.test.ts`)
- [x] Exact Haversine distance calculations (standard, long distance, zero-distance).
- [x] Compass bearing heading math (North 0°, East 90°, South 180°, West 270°).
- [x] Telemetry processing: cumulative distance, noise-filtered elevation gain/loss, GPS speed spike filtering.
- [x] Automatic 1-km split calculations with duration and pace metrics.

### GPX XML Ingestion (`tests/unit/gpxParser.test.ts`)
- [x] Valid GPX 1.0 and 1.1 schema parsing.
- [x] Extraction of Garmin `<TrackPointExtension>` heart rate, cadence, and temperature.
- [x] Error handling for malformed XML, empty strings, and missing coordinate points.

### Redux Toolkit State Management (`tests/unit/reduxSlices.test.ts`)
- [x] `activitySlice`: track assignment, loading states, error handling.
- [x] `playbackSlice`: play/pause toggling, scrubber index updates, speed multipliers (1x–10x), camera modes.
- [x] `uiSlice`: dark/light theme switching, modal state management, toast alerts queue.
- [x] `userSlice`: profile assignment and Pro subscription status.

### UI & Interaction (`tests/components/`)
- [x] Button click events, loading spinners, and disabled states.
- [x] Modal keyboard escape listener, close button, and backdrop click dismiss.
- [x] Telemetry HUD metric rendering.
- [x] Playback controls spacebar shortcut and speed selector.
- [x] Dropzone preset route loading.
