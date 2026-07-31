import type { Dispatch } from 'redux';
import { getToken } from 'firebase/messaging';
import { setUbereduxKey } from '../../Uberedux';
import { getFirebaseFirestore, getFirebaseMessaging } from '../../lib/firebase';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

/**
 * requestNotifications
 *
 * 1. Requests browser notification permission.
 * 2. Obtains an FCM registration token via the VAPID key.
 * 3. Persists the token to the authenticated user's Firestore document so the
 *    server can fan out push messages to all of the user's devices.
 * 4. Dispatches the token and permission state into nxAdmin.notifications.
 */
export const requestNotifications = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        if (typeof window === 'undefined') return;

        const setNotif = (patch: Record<string, any>) => {
            const current = getState()?.redux?.nxAdmin?.notifications || {};
            dispatch(setUbereduxKey({
                key: 'nxAdmin.notifications',
                value: { ...current, ...patch },
            }));
        };

        try {
            // ── 1. Permission ─────────────────────────────────────────────
            let permission = Notification.permission as string;
            if (permission === 'default') {
                permission = await Notification.requestPermission();
            }

            setNotif({ permission, initialized: true });

            if (permission !== 'granted') return;

            // ── 2. FCM token ──────────────────────────────────────────────
            const messaging = await getFirebaseMessaging();
            if (!messaging) return;

            // Share Firebase config with the background service worker
            const swReg = await navigator.serviceWorker.ready;
            swReg.active?.postMessage({
                type: 'FIREBASE_CONFIG',
                config: {
                    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
                    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
                    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
                    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
                    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
                },
            });

            const fcmToken = await getToken(messaging, {
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: swReg,
            });

            if (!fcmToken) return;

            setNotif({ fcmToken });
            // Log the FCM token for developer access
            console.log("Your FCM Token:", fcmToken);

            // ── 3. Persist token to Firestore ─────────────────────────────
            const uid = getState()?.redux?.paywall?.uid;
            if (uid) {
                const firestore = getFirebaseFirestore();
                const { collection, query, where, getDocs, updateDoc, arrayUnion } =
                    await import('firebase/firestore');
                const q = query(collection(firestore, 'users'), where('uid', '==', uid));
                const snap = await getDocs(q);
                snap.forEach(async (docSnap) => {
                    await updateDoc(docSnap.ref, {
                        fcmTokens: arrayUnion(fcmToken),
                    });
                });
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
