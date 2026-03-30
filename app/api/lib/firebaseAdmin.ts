import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

//const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!key) {
  throw new Error(
    'FIREBASE_SERVICE_ACCOUNT_KEY is not set in environment variables. Please set it in your .env file. See .env.example for details.'
  );
}
let serviceAccount;
try {
  serviceAccount = JSON.parse(key);
} catch (e) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON. Please check your .env file.');
}

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
