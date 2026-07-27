import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getEnv(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

let cachedServiceAccount = null;

function getServiceAccountFromEnv() {
  if (cachedServiceAccount !== null) {
    return cachedServiceAccount;
  }

  const raw = getEnv("FIREBASE_SERVICE_ACCOUNT_KEY");
  if (!raw) {
    cachedServiceAccount = {};
    return cachedServiceAccount;
  }

  try {
    const parsed = JSON.parse(raw);
    cachedServiceAccount = typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    cachedServiceAccount = {};
  }

  return cachedServiceAccount;
}

function getFirebaseProjectId() {
  return getEnv("FIREBASE_PROJECT_ID") || getServiceAccountFromEnv().project_id || "";
}

function getFirebaseClientEmail() {
  return getEnv("FIREBASE_CLIENT_EMAIL") || getServiceAccountFromEnv().client_email || "";
}

function getFirebasePrivateKey() {
  return getEnv("FIREBASE_PRIVATE_KEY") || getServiceAccountFromEnv().private_key || "";
}

function getCollectionName() {
  return getEnv("FIREBASE_HISTORY_COLLECTION") || "agent_history";
}

export function isFirebaseHistoryEnabled() {
  return Boolean(getFirebaseProjectId() && getFirebaseClientEmail() && getFirebasePrivateKey());
}

function getDb() {
  if (!isFirebaseHistoryEnabled()) {
    throw new Error("Firebase env vars are missing.");
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: getFirebaseProjectId(),
        clientEmail: getFirebaseClientEmail(),
        privateKey: getFirebasePrivateKey().replace(/\\n/g, "\n"),
      }),
    });
  }

  return getFirestore();
}

export async function readHistoryEntries(limitCount = 120) {
  const db = getDb();
  const querySnapshot = await db
    .collection(getCollectionName())
    .orderBy("createdAt", "desc")
    .limit(limitCount)
    .get();

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addHistoryEntry(entry) {
  const db = getDb();
  const id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  const payload = {
    ...entry,
    createdAt,
    id,
  };

  await db.collection(getCollectionName()).doc(id).set(payload);
  return payload;
}
