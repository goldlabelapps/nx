---
order: 9515
title: Product Vision & Functional Spec
description: NX repository documentation
icon: docs
tags: product, vision, specification
---

# Product Vision & Functional Spec

## Overview

**GpxRoute°** is an interactive, visually stunning route presentation platform designed to transform standard GPX files (from Garmin, Wahoo, Strava, Apple Watch, etc.) into engaging, dynamic, and shareable experiences.

Most GPX tools provide static 2D lines over flat maps and basic elevation charts. **GpxRoute°** brings activities to life with 3D terrain flyovers, pace/gradient-colored lines, milestone celebrations, one-click social share cards, and cloud persistence.

---

## Target Audience & Use Cases

1. **Outdoor Athletes & Explorers**: Runners, cyclists, hikers, and divers who want to celebrate and share memorable adventures.
2. **Event Organizers & Guides**: Showcasing race routes, trail courses, and guided itineraries in a rich 3D viewer.
3. **Fitness & Outdoor Creators**: Generating high-resolution social media cards (Instagram Stories, Strava, X) from their track data.

---

## Core Product Pillars

### 1. Immersive 3D Visualization
- **Mapbox 3D Terrain**: Digital elevation model (DEM) extrusion to highlight mountain passes, ridges, and valleys.
- **Dynamic Route Coloring**: Polylines styled by elevation gradient, speed/pace, or heart rate.
- **Cinematic Route Playback**: Camera flythrough that follows the route path with interactive speed controls (1x, 2x, 5x, 10x) and scrubbers.

### 2. Deep Insights & Interactive Data
- **Synchronized Telemetry**: Hovering over elevation or speed profiles moves the map camera and 3D marker in lockstep.
- **Split & Milestone Detection**: Automated identification of km/mile splits, peak altitude, max incline, and sprint segments.

### 3. Shareability & Social Storytelling
- **Instant Share Links**: Lightweight, permalink-ready URLs for routes saved in Firebase Firestore (`/r/[id]`).
- **Exportable Social Cards**: Clean 9:16 (Story) and 16:9 / 1:1 image card generators overlaying key stats on the 3D map route.
- **Email Invites & Shares**: Direct email sharing powered by Resend.

### 4. Zero-Friction Ingestion
- **Instant Browser GPX Parsing**: Drag-and-drop any `.gpx` file with immediate client-side rendering (no signup required).
- **Curated Demo Showcase**: Built-in library of scenic routes (e.g. coastal diving, alpine climbs, gravel loops) to explore immediately.

### 5. Pro Monetization Tier (Stripe)
- **Pro Features**: Custom 3D map styles (Cyberpunk Dark, Satellite 3D, Retro), 4K high-res export, unlimited cloud saved tracks, and custom route branding.
