import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function getFirebaseApp() {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
}

export function getFirebaseAuth() {
    return getAuth(getFirebaseApp());
}

export function getFirebaseFirestore() {
    return getFirestore(getFirebaseApp());
}

export function getFirebaseStorage() {
    return getStorage(getFirebaseApp());
}

/**
 * Returns a Firebase Messaging instance, or null when:
 * - running on the server (SSR)
 * - the browser does not support the Push API / service workers
 */
export async function getFirebaseMessaging(): Promise<Messaging | null> {
    if (typeof window === "undefined") return null;
    const supported = await isSupported();
    if (!supported) return null;
    return getMessaging(getFirebaseApp());
}
