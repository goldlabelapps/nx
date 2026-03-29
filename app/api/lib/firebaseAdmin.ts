import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

//const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!key) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in environment variables');
}
const serviceAccount = JSON.parse(key);

export function getFirebaseAdminApp() {
  if (!getApps().length) {
    return initializeApp({
      credential: cert(serviceAccount),
      storageBucket: "goldlabel-pr0",
    });
  }
  return getApp();
}

export function verifyIdToken(idToken: string) {
  return getAuth(getFirebaseAdminApp()).verifyIdToken(idToken);
}
