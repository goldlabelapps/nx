import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

export function getFirebaseAdminApp() {
  if (!getApps().length) {
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }
  return getApp();
}

export function verifyIdToken(idToken: string) {
  return getAuth(getFirebaseAdminApp()).verifyIdToken(idToken);
}
