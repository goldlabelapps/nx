import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { ServiceAccount } from "firebase-admin";

function normalizePrivateKey(value: string): string {
  return value.replace(/\\n/g, "\n");
}

function parseServiceAccountFromEnv(): ServiceAccount {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();

  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson) as ServiceAccount;
      if (!parsed.projectId && (parsed as { project_id?: string }).project_id) {
        parsed.projectId = (parsed as { project_id?: string }).project_id;
      }
      if (!parsed.clientEmail && (parsed as { client_email?: string }).client_email) {
        parsed.clientEmail = (parsed as { client_email?: string }).client_email;
      }
      if (!parsed.privateKey && (parsed as { private_key?: string }).private_key) {
        parsed.privateKey = (parsed as { private_key?: string }).private_key;
      }

      if (!parsed.projectId || !parsed.clientEmail || !parsed.privateKey) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing required fields");
      }

      parsed.privateKey = normalizePrivateKey(parsed.privateKey);
      return parsed;
    } catch (error) {
      throw new Error(
        `Invalid FIREBASE_SERVICE_ACCOUNT_KEY JSON. ${error instanceof Error ? error.message : "Unknown parse error"}`
      );
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase admin credentials. Provide FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY"
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey: normalizePrivateKey(privateKey),
  };
}

import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdminApp() {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;

  const serviceAccount = parseServiceAccountFromEnv();
  return initializeApp({ credential: cert(serviceAccount) });
}

export const firebaseAdminAuth = new Proxy({} as ReturnType<typeof getAuth>, {
  get(_target, prop) {
    const instance = getAuth(getFirebaseAdminApp()) as unknown as Record<string | symbol, unknown>;
    const value = instance[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export const firebaseAdminFirestore = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_target, prop) {
    const instance = getFirestore(getFirebaseAdminApp()) as unknown as Record<string | symbol, unknown>;
    const value = instance[prop];
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
