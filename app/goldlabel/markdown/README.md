---
order: 60
title: Read me first
description: Open Source Next App
slug: /work/example
icon: examples
tags: Open Source, JavaScript, TypeScript, React, Material UI, Flash, Server Side JavaScript, Node, NextJS, App Router, GitHub
---


# Firebase Project Migration to 'listingslab'

## Step 1: Get Firebase Credentials

### A. Web App Credentials
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select the **listingslab** project
3. Click the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. If no web app exists, click "Add app" → Web (</>) icon
6. Register app with nickname: "listingslab-web"
7. Copy the config values to `.env`:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `storageBucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### B. Service Account (Admin SDK)
1. In Firebase Console, go to Project Settings
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Copy the ENTIRE JSON content as a single line to `.env`:
   - Set as value for `FIREBASE_SERVICE_ACCOUNT`

## Step 2: Deploy Firestore Configuration

### Login to Firebase
```bash
npx firebase-tools login
```

### Deploy Firestore Rules
```bash
npx firebase-tools deploy --only firestore:rules
```

### Deploy Firestore Indexes
```bash
npx firebase-tools deploy --only firestore:indexes
```

### Deploy Everything
```bash
npx firebase-tools deploy --only firestore
```

## Step 3: Seed Firestore Database

After credentials are set up, run the seed script:

```bash
npx tsx goldlabel/lib/seed-firestore.ts
```

Or if you have a dev script:
```bash
npm run seed
# or
yarn seed
```

## Step 4: Verify Setup

1. Check Firestore Console: https://console.firebase.google.com/project/listingslab/firestore
2. Verify documents exist in the `markdown` collection
3. Test the Next.js app locally: `npm run dev`

## Files Moved to goldlabel/lib

- `firebase.json` - Firebase project configuration
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore composite indexes

Symlinks were created in the root directory for Firebase CLI compatibility.

## Current Firestore Indexes

The project requires one composite index for the `markdown` collection:
- Fields: `published` (ASC), `updatedAt` (DESC)
- This enables querying published documents sorted by update time

## Security Rules

Current rules allow all read/write access. **Update these in production!**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Troubleshooting

### Error: "Missing or insufficient permissions"
- Verify service account has Firestore Admin role
- Check that `FIREBASE_SERVICE_ACCOUNT` is properly formatted JSON

### Error: "Index not found"
- Run: `npx firebase-tools deploy --only firestore:indexes`
- Wait 2-3 minutes for indexes to build

### Error: "Project not found"
- Verify `.firebaserc` has correct project ID: "listingslab"
- Run: `npx firebase-tools use listingslab`


# Firestore SSG Setup

This project uses Firestore as a data source for Static Site Generation (SSG) in Next.js.

## Setup

### 1. Install Dependencies
```bash
yarn add firebase firebase-admin
```

### 2. Configure Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create or select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Copy the values to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your Firebase credentials.

### 3. Firestore Collection Structure

Create a collection named `docs` in Firestore with documents following this schema:

```typescript
{
  slug: string;              // e.g., "about" or "blog/my-post"
  title: string;             // Page title
  content: string;           // HTML content
  featuredImage?: string;    // URL to featured image
  description?: string;      // Meta description
  published: boolean;        // Only published docs are included in SSG
  createdAt: string;         // ISO date string
  updatedAt: string;         // ISO date string
  metadata?: {
    author?: string;
    tags?: string[];
    category?: string;
  }
}
```

### 4. Build Static Site

At build time, Next.js will:
1. Fetch all published documents from Firestore
2. Generate static pages for each document based on its slug
3. Pre-render all content for optimal performance

```bash
yarn build
```

## How It Works

- **`generateStaticParams()`**: Fetches all slugs from Firestore at build time to generate static paths
- **`getDocBySlug()`**: Fetches document content for each page during SSG
- **Fallback content**: If no document exists for a slug, default content is shown

## Example Firestore Documents

### Home Page
```json
{
  "slug": "",
  "title": "Welcome Home",
  "content": "<p>This is the home page content from Firestore.</p>",
  "published": true,
  "createdAt": "2026-01-03T00:00:00Z",
  "updatedAt": "2026-01-03T00:00:00Z"
}
```

### About Page
```json
{
  "slug": "about",
  "title": "About Us",
  "content": "<h2>Our Story</h2><p>Content here...</p>",
  "featuredImage": "https://example.com/about.jpg",
  "description": "Learn about our company",
  "published": true,
  "createdAt": "2026-01-03T00:00:00Z",
  "updatedAt": "2026-01-03T00:00:00Z",
  "metadata": {
    "author": "John Doe",
    "tags": ["company", "about"]
  }
}
```

## Benefits of SSG with Firestore

- ✅ Content managed in Firestore (easy updates via Firebase Console or custom CMS)
- ✅ Blazing fast static pages (pre-rendered at build time)
- ✅ SEO-friendly (all content is in HTML at build time)
- ✅ Scalable (Firestore can handle large content collections)
- ✅ Dynamic routing (automatic page generation based on slugs)

## Rebuilding

After updating content in Firestore, rebuild and redeploy:

```bash
yarn build
yarn start
```

For automated rebuilds, consider setting up webhooks or scheduled builds in your deployment platform.
