# ed-tech

A modern, full-stack educational technology platform built with Next.js 16, featuring a monorepo architecture and comprehensive content management system.

## Overview

This project is an EdTech application designed for delivering educational content through a web-based platform. It combines a robust frontend with Firebase authentication, markdown-based content management, and a custom state management system.

### Key Features

- **Content Management**: Markdown-based content with automatic navigation generation
- **Authentication**: Firebase-powered user authentication and paywall system
- **State Management**: Custom Uberedux Redux wrapper with dot-path updates
- **UI/UX**: Material-UI themed design system with responsive components
- **Routing**: Dynamic routing based on pathname with server-side rendering
- **Monorepo**: Yarn workspaces for efficient package management

## Architecture

The project uses a monorepo structure with the following key components:

- **App Layer** (`app/`): Next.js 16 application with dynamic routing
- **Core Package** (`goldlabel/`): Main business logic as a local npm package
  - `src/Uberedux/`: Custom Redux state management
  - `src/DesignSystem/`: MUI theme and UI components
  - `src/Paywall/`: Authentication and user management
  - `src/EdTech/`: Main application logic
  - `markdown/`: Content files with frontmatter metadata
  - `src/lib/generate.mjs`: Navigation generation script

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Material-UI (MUI), custom theme system
- **State Management**: Redux with custom Uberedux wrapper
- **Authentication**: Firebase Auth
- **Content**: Markdown with frontmatter
- **Build Tools**: tsup, Yarn workspaces
- **PWA**: Service worker integration

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Firebase project (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ed-tech
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up Firebase configuration in `goldlabel/src/lib/firebase.tsx`

### Development

Start the development server:
```bash
yarn dev
```

This command:
1. Runs the content generation script (`generate.mjs`)
2. Starts the Next.js development server

### Build Commands

- `yarn build`: Production build with content generation
- `yarn goldlabel`: Build the goldlabel package in watch mode
- `yarn generate`: Regenerate navigation from markdown files

### Adding Content

1. Add markdown files to `goldlabel/markdown/`
2. Include frontmatter metadata (title, description, etc.)
3. Run `yarn generate` to update navigation

## Project Structure

```
ed-tech/
├── app/                    # Next.js app directory
│   ├── [[...slug]]/       # Dynamic routing
│   ├── layout.tsx         # Root layout
│   └── styles.css         # Global styles
├── goldlabel/             # Core package
│   ├── markdown/          # Content files
│   ├── src/               # Source code
│   │   ├── DesignSystem/  # UI components
│   │   ├── Paywall/       # Authentication
│   │   ├── EdTech/        # Main logic
│   │   ├── Uberedux/      # State management
│   │   └── lib/           # Utilities
│   └── package.json       # Package config
├── public/                # Static assets
├── package.json           # Root dependencies
└── tsconfig.json          # TypeScript config
```

## State Management

The application uses a custom Redux wrapper called Uberedux:

- State slices are defined in each module's `initialState.tsx`
- Updates use dot-path notation (e.g., `'paywall.authed'`)
- Thunks dispatch `setUbereduxKey` actions

## API Documentation

### Markdown CRUD API

The platform includes a RESTful API for managing markdown documents with Firebase Firestore.

#### Setup

1. Install Firebase Admin SDK:
   ```bash
   yarn add firebase-admin
   ```

2. Set up environment variables in `.env.local`:
   ```env
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'
   ```

3. Deploy Firestore security rules (see [FIRESTORE_RULES.md](app/api/markdown/FIRESTORE_RULES.md))

#### Endpoints

**List Documents**
```
GET /api/markdown?limit=20&offset=0&published=true&authorId=uid123
```

**Get Single Document**
```
GET /api/markdown/[id]
```

**Create Document** (requires authentication)
```
POST /api/markdown
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "title": "My Document",
  "content": "# Hello World",
  "slug": "my-document",
  "published": false,
  "tags": ["tutorial"],
  "metadata": {}
}
```

**Update Document** (requires authentication & ownership)
```
PUT /api/markdown/[id]
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

**Delete Document** (requires authentication & ownership)
```
DELETE /api/markdown/[id]
Authorization: Bearer <firebase_id_token>
```

#### Authentication

All write operations require a Firebase ID token:

```typescript
import { auth } from 'goldlabel/src/lib/firebase';

const user = auth.currentUser;
const token = await user.getIdToken();

fetch('/api/markdown', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title, content, slug }),
});
```

#### Data Model

```typescript
interface MarkdownDocument {
  id: string;                     // Firestore document ID
  title: string;                  // Document title
  content: string;                // Markdown content
  slug: string;                   // URL-friendly slug (unique)
  author: string;                 // Author email
  authorId: string;               // Firebase Auth UID
  createdAt: string;              // ISO timestamp
  updatedAt: string;              // ISO timestamp
  published: boolean;             // Visibility status
  tags?: string[];                // Optional tags
  metadata?: Record<string, unknown>; // Optional metadata
}
```

For complete API documentation, examples, and usage patterns, see [app/api/markdown/README.md](app/api/markdown/README.md).

## Contributing

1. Follow the established module structure for new features
2. Use absolute imports from `goldlabel/src/`
3. Run `yarn generate` after modifying markdown content
4. Ensure TypeScript compilation passes

## License

[Add license information here]