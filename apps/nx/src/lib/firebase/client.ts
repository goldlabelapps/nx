import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Next.js only inlines NEXT_PUBLIC_* vars for client bundles when accessed via a static
// literal `process.env.NEXT_PUBLIC_X` expression, so these must not be looked up dynamically.
function withFallback(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

function getFirebaseClientApp() {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const apiKey = withFallback(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "demo-api-key");
  const authDomain = withFallback(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, "demo-project.firebaseapp.com");
  const projectId = withFallback(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, "demo-project");
  const storageBucket = withFallback(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, "demo-project.appspot.com");
  const messagingSenderId = withFallback(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, "1234567890");
  const appId = withFallback(process.env.NEXT_PUBLIC_FIREBASE_APP_ID, "1:1234567890:web:demo");

  const isPlaceholderKey =
    !apiKey ||
    apiKey === "demo-api-key" ||
    apiKey.includes("your-public-api-key") ||
    apiKey.includes("your-api-key") ||
    apiKey.startsWith("your-");

  if (process.env.NODE_ENV === "development" && isPlaceholderKey) {
    console.warn(
      "[Firebase Auth Warning]: NEXT_PUBLIC_FIREBASE_API_KEY is not set or contains a placeholder value ('" +
        apiKey +
        "').\n" +
        "To fix: Add NEXT_PUBLIC_FIREBASE_API_KEY=<your-real-key> to apps/nx/.env.local and restart your Next.js dev server."
    );
  }

  return initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  });
}

let emulatorConnected = false;

export function getFirebaseClientAuth() {
  const app = getFirebaseClientApp();
  const auth = getAuth(app);

  const emulatorHost =
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST ||
    process.env.FIREBASE_AUTH_EMULATOR_HOST;

  if (emulatorHost && !emulatorConnected) {
    try {
      connectAuthEmulator(auth, emulatorHost.startsWith("http") ? emulatorHost : `http://${emulatorHost}`);
      emulatorConnected = true;
    } catch {
      // Emulator already connected or cannot connect
    }
  }

  return auth;
}

export function getFirebaseClientFirestore() {
  return getFirestore(getFirebaseClientApp());
}

