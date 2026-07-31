/**
 * firebase-messaging-sw.js
 *
 * FCM requires a service worker registered at /firebase-messaging-sw.js for
 * background message delivery (when the tab is closed or backgrounded).
 *
 * Firebase config values are injected at runtime via the /api/firebase-config
 * endpoint so no secrets are baked into this static file.  The service worker
 * fetches the config once and caches it in memory for the lifetime of the SW.
 */

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// ─── Runtime config ──────────────────────────────────────────────────────────
// Populated by the first message from the client page (see useNotifications).
let messaging = null;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    if (messaging) return; // already initialised
    try {
      const app = firebase.initializeApp(event.data.config);
      messaging = firebase.messaging(app);

      messaging.onBackgroundMessage((payload) => {
        const { title = 'New notification', body = '', icon, badge, data } = (
          payload.notification || {}
        );

        self.registration.showNotification(title, {
          body,
          icon: icon || '/nxadmin/png/favicon.png',
          badge: badge || '/nxadmin/png/favicon.png',
          data: data || payload.data || {},
          requireInteraction: false,
        });
      });
    } catch (_) {
      // Firebase may already be initialised in another SW context — ignore.
    }
  }
});

// ─── Notification click handler ───────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Focus an existing window if one is open at the target URL
        for (const client of windowClients) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
