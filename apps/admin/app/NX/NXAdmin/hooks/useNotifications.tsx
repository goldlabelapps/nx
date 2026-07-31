'use client';
import { useEffect, useRef } from 'react';
import { onMessage } from 'firebase/messaging';
import { useDispatch } from '../../Uberedux';
import { getFirebaseMessaging } from '../../lib/firebase';
import { setUbereduxKey } from '../../Uberedux';

const NOTIFICATION_SOUND = '/nxadmin/mp3/notification.mp3';

/** Increment the in-app unread counter and update the OS app badge. */
function incrementBadge(
    dispatch: (action: any) => void,
    getUnreadCount: () => number,
) {
    const next = getUnreadCount() + 1;
    dispatch(setUbereduxKey({ key: 'nxAdmin.notifications.unreadCount', value: next }));
    if ('setAppBadge' in navigator) {
        (navigator as Navigator & { setAppBadge: (n: number) => Promise<void> })
            .setAppBadge(next)
            .catch(() => undefined);
    }
}

/**
 * useNotifications
 *
 * Registers a foreground FCM message listener. When a push arrives while the
 * tab is visible it:
 *   1. Shows a browser Notification (falls back gracefully if blocked).
 *   2. Plays a short notification sound.
 *   3. Increments the unread counter in Redux and the OS app badge.
 */
export function useNotifications() {
    const dispatch = useDispatch();
    const unsubRef = useRef<(() => void) | null>(null);

    // Keep a stable ref to getState so we can read the latest unreadCount
    // without recreating the effect on every render.
    const unreadRef = useRef<number>(0);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const messaging = await getFirebaseMessaging();
            if (!messaging || cancelled) return;

            unsubRef.current = onMessage(messaging, (payload) => {
                const title = payload.notification?.title || 'New notification';
                const body = payload.notification?.body || '';
                const icon = payload.notification?.icon || '/nxadmin/png/favicon.png';
                const badge = '/nxadmin/png/favicon.png';
                const url = (payload.data as Record<string, string> | undefined)?.url || '/';

                // ── Browser Notification ─────────────────────────────────
                if (Notification.permission === 'granted') {
                    const notif = new Notification(title, { body, icon, badge });
                    notif.onclick = () => {
                        window.focus();
                        window.location.href = url;
                    };
                }

                // ── Notification sound ───────────────────────────────────
                try {
                    const audio = new Audio(NOTIFICATION_SOUND);
                    audio.volume = 0.6;
                    audio.play().catch(() => undefined); // autoplay may be blocked — fail silently
                } catch {
                    // Audio not supported — ignore
                }

                // ── Badge + unread count ─────────────────────────────────
                incrementBadge(dispatch, () => {
                    unreadRef.current += 1;
                    return unreadRef.current;
                });
            });
        })();

        return () => {
            cancelled = true;
            unsubRef.current?.();
        };
    }, [dispatch]);
}
