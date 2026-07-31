# NX° Admin — Push Notifications (FCM)

NX° Admin integrates Firebase Cloud Messaging (FCM) to deliver push notifications to authenticated users. The system covers foreground messages (tab in focus), background messages (service worker), permission management, and OS app badge counts.

---

## Architecture

```
Server                    Client (tab open)          Background SW
  │                            │                          │
  │  POST /api/notify          │                          │
  │──────────────────────────► API route                  │
  │                            │ firebase-admin           │
  │                            │ sendEachForMulticast()   │
  │                            │                          │
  │                    FCM ────┼──────────────────────────►
  │                            │                          │
  │                    onMessage()                  firebase-messaging-sw.js
  │                    (foreground)                 (background/OS notification)
  │                            │
  │                    show Notification
  │                    play sound
  │                    increment badge
```

---

## Setup

### 1. Environment variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=…
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=…
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
NEXT_PUBLIC_FIREBASE_APP_ID=…
NEXT_PUBLIC_FIREBASE_VAPID_KEY=…       # Web Push certificate (VAPID key from Firebase Console)

# Server-side only (for /api/notify)
FIREBASE_ADMIN_PROJECT_ID=…
FIREBASE_ADMIN_CLIENT_EMAIL=…
FIREBASE_ADMIN_PRIVATE_KEY=…
```

### 2. Service Worker

Place `firebase-messaging-sw.js` in your `public/` root. This file handles background push notifications (when the browser tab is closed or not focused). It listens for the `FIREBASE_CONFIG` message from the client to initialise Firebase dynamically.

### 3. Notification sound

Place `notification.mp3` at `public/nxadmin/mp3/notification.mp3`. This file is played when a foreground notification arrives.

---

## Permission & Token Flow

The `requestNotifications` action handles the full permission → token → persist flow:

```
User authenticates
      │
      ▼
NXAdmin.tsx useEffect → dispatch(requestNotifications())
      │
      ▼
requestNotifications action:
  1. Check Notification.permission
  2. If 'default' → call Notification.requestPermission()
  3. Dispatch { permission, initialized: true } → nxAdmin.notifications
  4. If 'denied' → stop
  5. If 'granted':
       a. getFirebaseMessaging()
       b. Post FIREBASE_CONFIG to service worker
       c. getToken(messaging, { vapidKey, serviceWorkerRegistration })
       d. Dispatch { fcmToken } → nxAdmin.notifications
       e. Persist fcmToken to Firestore: users/{uid}.fcmTokens (arrayUnion)
```

### Redux state written

```ts
state.redux.nxAdmin.notifications = {
  permission: 'default' | 'granted' | 'denied',
  fcmToken: string | null,
  unreadCount: number,
  initialized: boolean,
}
```

---

## Foreground Messages (`useNotifications`)

The `useNotifications` hook registers an `onMessage` listener for when the app tab is focused. It is called automatically by `<MiniDrawer>`.

```tsx
import { useNotifications } from '@/NX/NXAdmin';

// Automatically mounted in MiniDrawer — no manual setup needed.
// Include it in a custom shell if you build your own:
function CustomShell() {
  useNotifications();
  return <main>…</main>;
}
```

**On each incoming foreground message:**

1. **Browser Notification** — Shows a native notification with title, body, icon, and badge (clickable, navigates to `payload.data.url`).
2. **Sound** — Plays `/nxadmin/mp3/notification.mp3` at 60% volume (silently ignored if autoplay is blocked).
3. **Unread count** — Increments `nxAdmin.notifications.unreadCount` in Redux.
4. **OS badge** — Calls `navigator.setAppBadge(count)` (falls back silently on unsupported browsers).

---

## The Notification Bell (`<NotificationBell>`)

The `<NotificationBell>` component in the top app bar shows the unread notification count and allows users to request permission or clear the badge.

```tsx
import { NotificationBell } from '@/NX/NXAdmin';

<NotificationBell />
```

**Behaviour:**
- Shows a badge with the unread count.
- If permission is not `'granted'`: clicking dispatches `requestNotifications()`.
- If permission is `'granted'`: clicking clears the count and calls `navigator.clearAppBadge()`.
- The FCM token is logged to the console whenever it is available (useful for testing).

---

## Sending Notifications from the Server

Use the `/api/notify` route to send notifications to one or more users.

```ts
// Example: POST /api/notify
const response = await fetch('/api/notify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tokens: ['fcm-token-1', 'fcm-token-2'],
    title: 'New order received',
    body: 'Order #1234 is ready for review.',
    url: '/orders/1234',
  }),
});
```

The route uses `firebase-admin` and `sendEachForMulticast` to fan the message out to all provided FCM tokens.

---

## Background Notifications

Background notifications are handled by `public/firebase-messaging-sw.js`. When a push arrives while the tab is not focused:

1. The service worker receives the push event.
2. Firebase Messaging SDK displays an OS-level notification automatically.
3. Clicking the notification focuses the browser and navigates to the notification URL.

**Important:** The service worker must receive `FIREBASE_CONFIG` from the client before it can process messages. This is done automatically by `requestNotifications()` via `serviceWorker.active.postMessage(...)`.

---

## Testing Push Notifications

1. Open the browser console after signing in — the FCM token is logged as `"Your FCM Token: …"`.
2. Copy the token.
3. POST to `/api/notify` with that token to send a test notification.
4. Check both foreground (tab in focus) and background (tab hidden/closed) behaviour.
