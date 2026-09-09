---
order: 9517
title: Environment Variables
description: NX repository documentation
icon: docs
tags: configuration, environment-variables, devops
image: developer
---

# Environment Variables Reference

This document provides a comprehensive list of all client-side and server-side environment variables required across **GpxRoute°**.

---

## 1. Mapbox Configuration (Client)

To enable 3D terrain rendering, vector tiles, and satellite imagery:

```bash
# Mapbox public token (client-accessible)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ5b3VyLXRva2VuIn0...
```

---

## 2. Firebase Configuration

### Client Web SDK (Auth & Firestore Reads)
Required for user login, session management, and loading public route documents in the browser:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
```

### Server Admin SDK (Protected Firestore Writes & API Endpoints)
Used within Next.js API routes (`/api/routes`, `/api/activities`) for authenticated database writes and deletes:

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
ROUTES_API_TOKEN=your-secure-internal-api-secret
```

---

## 3. Stripe Configuration (Monetization & Pro Tier)

Required for processing checkout sessions, subscription management, and webhook verification:

```bash
# Public key for client-side Stripe elements (if needed)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Secret key for server-side checkout session creation
STRIPE_SECRET_KEY=sk_test_...

# Webhook signing secret to verify Stripe webhook events
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 4. Resend Configuration (Email Notifications & Sharing)

Required for dispatching activity share invitations and receipt emails:

```bash
# API key for Resend email client
RESEND_API_KEY=re_...
```

---

## 5. Security & Firestore Rules Summary

- **Firestore Collections**:
  - `activities`: Public read access for shared GPX routes; write access strictly restricted to authenticated users or server admin.
  - `routes`: Public read access; write/patch/delete restricted to server-side API endpoints with bearer authentication (`ROUTES_API_TOKEN`).
- **Client Security**: No secret keys (`FIREBASE_PRIVATE_KEY`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `ROUTES_API_TOKEN`) should ever be prefixed with `NEXT_PUBLIC_`.
