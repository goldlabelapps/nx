# @goldlabelapps/saas

> Shared authentication infrastructure for NX° applications.

## Goal

This package is intended to let an NX° application connect to a backend authentication provider, beginning with Firebase and with Supabase support planned for the future. It will provide the authentication and session primitives needed for an NX° site to control access to public and authenticated content through shared middleware, guards, and provider-agnostic APIs.

## Current Status

The package currently provides Next.js route classification, edge middleware, and a server-side `AuthGuard` that check for the presence of a `__session` cookie. It does not yet connect to Firebase or Supabase, verify tokens, create or refresh sessions, or expose authenticated user state. The cookie-presence check must not be treated as backend authentication or as protection against forged cookies.

## Features

- **Route Zone Classification**: `isPublicPath` and `getRouteZone` for dividing applications into public marketing and authenticated private spaces.
- **Edge Auth Middleware**: `createAuthMiddleware` for edge-safe session cookie presence checks in Next.js middleware.
- **Server Auth Guards**: `AuthGuard` server component for protecting authenticated layout trees with a redirect to the configured sign-in path; provider-backed authentication is not implemented yet.
- **Session Constants**: `SESSION_COOKIE_NAME` (`__session`) and cookie parsing helpers.
- **Firebase Create Account**: `CreateAccount` client component with Email/Password, Google, Twitter, and GitHub registration. Pass it an initialized Firebase `Auth` instance and use `onSuccess` to redirect or refresh application state after sign-up.
- **Firebase Login**: `Login` client component with Email/Password, Google, Twitter, and GitHub sign-in. Pass it an initialized Firebase `Auth` instance and use `onSuccess` to redirect or refresh application state after sign-in.
