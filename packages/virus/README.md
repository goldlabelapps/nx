# @nx/virus

`@nx/virus` is a shared package for:

- generating a client fingerprint identifier (using `@fingerprintjs/fingerprintjs` when available)
- creating/updating a Firestore document for that fingerprint
- enriching the document with device + geo information
- subscribing in real time to that document
- letting founder/admin code merge personalization data into the same object

## Core model

Each user document lives in the `fingerprints` collection by default and uses the fingerprint id as the document id.

Example document shape:

```json
{
  "id": "fpjs_visitor_id",
  "fingerprintId": "vx_...",
  "name": "New Visitor",
  "avatar": "guest",
  "created": 1754230000000,
  "updated": 1754230000000,
  "device": { "ua": "...", "browser": "Chrome", "os": "macOS" },
  "geo": { "ip": "...", "city": "...", "country_name": "..." },
  "signals": { "userAgent": "..." },
  "traits": { "plan": "free" },
  "founder": { "message": "Hi Alice" },
  "meta": { "source": "landing-page" },
  "createdAt": "Firestore server timestamp",
  "updatedAt": "Firestore server timestamp"
}
```

## Typical flow

1. Client app generates/loads fingerprint id via localStorage.
2. Client calls `registerFingerprint` to upsert its profile in Firestore.
3. During registration, `@nx/virus` enriches with IP geolocation when `NEXT_PUBLIC_IPGEOLOCATION_API_KEY` is present.
4. Client calls `subscribeToFingerprint` to receive founder-side updates in real time.
5. Founder/admin code calls `updateFingerprintFounderData` to personalize that user profile.

## Usage

```ts
import {
  getOrCreateFingerprintId,
  registerFingerprint,
  subscribeToFingerprint,
  updateFingerprintFounderData,
} from "@nx/virus";

// 1) Create/load local fingerprint id
const fingerprintId = await getOrCreateFingerprintId();

// 2) Upsert client profile
await registerFingerprint(db, {
  fingerprintId,
  traits: { locale: "en-GB" },
  meta: { app: "www" },
});

// 3) Subscribe to that profile
const unsubscribe = subscribeToFingerprint(db, fingerprintId, (record) => {
  if (!record) return;
  // record.founder can be used for founder-defined personalized content
  console.log(record.founder);
});

// 4) Founder/admin can update personalization fields
await updateFingerprintFounderData(db, fingerprintId, {
  message: "Welcome back!",
  badge: "early-adopter",
});

// Later
unsubscribe();
```

## Fingerprint + Geo Notes

- `@nx/virus` will use FingerprintJS visitor IDs when the package is available.
- You can still pass `visitorId` explicitly to override fingerprint generation.
- Geo enrichment is best-effort and uses `NEXT_PUBLIC_IPGEOLOCATION_API_KEY`; failures do not block registration.
