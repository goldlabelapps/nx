---
order: 8000
title: Prospects
description: package
icon: docs
tags: architecture, history, roadmap, package
---

An agentic AI sales and real-time prospect engagement package for Goldlabel applications.

## 💡 Overview

**Prospects** is not just a lead database, CRM, or automated email sender. It is a **real-time sensor and interactive communication layer** for personalized sales experiences.

Instead of traditional bulk outreach (`500 leads → 500 emails → hope`), Prospects follows a high-touch, real-time model:
1. **Identify & Understand**: Research target prospects and create rich profile models.
2. **Personalized Pitches**: Deliver bespoke landing pages and experiences (`Pitches`) tailored to individual contacts (`People`).
3. **Fingerprint-Based Tracking**: Treat the pitch as a sensor into the sales relationship using client-side device fingerprinting (via FingerprintJS) and IP/geo enrichment (`ipgeo`).
4. **Real-time Remote Control & Live Communication**: Detect prospect engagement as it happens, alerting the salesperson and allowing instant real-time interactions (e.g. messaging, opening full-screen tailored decks, smooth scrolling) without requiring user login or authentication.

---

## 🏗 Conceptual Architecture

```
Salesperson
   │
   ├─► Creates/manages People & Pitches
   ├─► Sends unique Pitch link to target Person
   │
Prospect / Visitor
   │
   ├─► Opens Pitch link (Zero-auth, zero login required)
   ├─► <Prospects /> mounts at app root
   ├─► Computes browser fingerprint (FingerprintJS) & fetches IP/Geo (ipgeo)
   ├─► Links Pitch ID & campaign context to fingerprint ID
   ├─► Subscribes client browser to Firestore: prospects/people/{fingerprintId} via onSnapshot
   │
Real-Time Interaction & Remote Commands
   │
   ├─► Prospect clicks, returns, or spends time on sections
   ├─► Salesperson alerted with live context & AI-generated insights
   └─► Salesperson issues live remote actions (OPEN_FULLSCREEN_DECK, SHOW_MESSAGE, NAVIGATE_TO_SECTION)
```

---

## 🔒 Fingerprint & Identity Model

- **Device Fingerprint as Identity**: A person is defined by their unique client browser/device fingerprint computed via `@fingerprintjs/fingerprintjs`.
- **Incognito & Storage Resilient**: Fingerprint identifier remains persistent across private/incognito browsing mode, clear-cache events, and cookie purges.
- **Cross-Device Distinction**: A prospect viewing a pitch on a mobile phone vs. a laptop produces two distinct fingerprint records, enabling accurate multi-session device tracking.

---

## 📡 Core Data Contracts & TypeScript Definitions

```typescript
export type JsonLike =
  | string
  | number
  | boolean
  | null
  | JsonLike[]
  | { [key: string]: JsonLike };

export type VirusProfileObject = Record<string, JsonLike | unknown>;

export type VirusGeoRecord = {
  city?: string;
  district?: string;
  state_prov?: string;
  state_code?: string;
  country_name?: string;
  country_name_official?: string;
  country_code2?: string;
  country_code3?: string;
  country_emoji?: string;
  continent_name?: string;
  continent_code?: string;
  latitude?: number | string;
  longitude?: number | string;
  lat?: number | string;
  lon?: number | string;
  zipcode?: string;
  ip?: string;
  calling_code?: string;
  connection_type?: string;
  isp?: string;
  organization?: string;
  country_flag?: string;
  is_eu?: boolean;
  time_zone?: Record<string, unknown>;
  currency?: Record<string, unknown>;
} & Record<string, unknown>;

export type VirusDeviceInfo = {
  ua: string;
  browser: string;
  browserVersion?: string;
  os: string;
  osVersion?: string;
  platform: string;
  vendor: string;
  isMobile: boolean;
  languages: string[];
  device: {
    vendor?: string;
    model?: string;
    type?: string;
  };
  cpu: string;
  engine: {
    name?: string;
    version?: string;
  };
  model?: string;
  modelCode?: string;
};

export type VirusFingerprintSignals = {
  userAgent: string;
  language: string;
  languages: string[];
  platform: string;
  timezone: string;
  colorDepth: number;
  pixelRatio: number;
  screen: string;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  doNotTrack: string;
};

export type VirusFingerprintRecord = {
  id: string;
  fingerprintId: string;
  name: string;
  avatar: string;
  created: number;
  updated: number;
  createdAt?: unknown;
  updatedAt?: unknown;
  device: VirusDeviceInfo;
  geo?: VirusGeoRecord;
  signals: VirusFingerprintSignals;
  traits: VirusProfileObject;
  founder: VirusProfileObject;
  meta: VirusProfileObject;
};

export type CreateFingerprintIdOptions = {
  visitorId?: string;
  forceRefresh?: boolean;
  storageKey?: string;
};

export type FetchVirusGeoOptions = {
  enabled?: boolean;
  apiKey?: string;
  endpoint?: string;
  timeoutMs?: number;
};

export type RegisterFingerprintOptions = {
  collectionName?: string;
  fingerprintId?: string;
  visitorId?: string;
  storageKey?: string;
  traits?: VirusProfileObject;
  founder?: VirusProfileObject;
  meta?: VirusProfileObject;
  name?: string;
  avatar?: string;
  fetchGeo?: FetchVirusGeoOptions | boolean;
};

export type SubscribeToFingerprintOptions = {
  collectionName?: string;
};

export type UpdateFingerprintOptions = {
  collectionName?: string;
};
```

---

## 🛠 Usage & Integration

Render `<Prospects />` at the top level of any host application:

```tsx
import { Prospects } from "@goldlabelapps/prospects";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Prospects />
        {children}
      </body>
    </html>
  );
}
```

---

## 📦 Development & Build Commands

```bash
# Type check package
pnpm --filter @goldlabelapps/prospects type-check

# Build compiled package output to dist/
pnpm --filter @goldlabelapps/prospects build
```

