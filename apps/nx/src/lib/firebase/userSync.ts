import { firebaseAdminAuth, firebaseAdminFirestore } from "./admin";
import { sendNewUserNotification } from "../email";

export interface FirestoreUserData {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  disabled: boolean;
  providerIds: string[];
  createdAt: string;
  lastSignInAt: string;
  updatedAt: string;
}

export async function syncUserToFirestore(uid: string): Promise<FirestoreUserData | null> {
  try {
    const userRecord = await firebaseAdminAuth.getUser(uid);
    const now = new Date().toISOString();

    const providerIds = userRecord.providerData.map((p) => p.providerId);
    if (providerIds.length === 0 && userRecord.providerData.length === 0) {
      providerIds.push("password");
    }

    const userData: FirestoreUserData = {
      uid: userRecord.uid,
      email: userRecord.email ?? null,
      emailVerified: userRecord.emailVerified ?? false,
      displayName: userRecord.displayName ?? null,
      photoURL: userRecord.photoURL ?? null,
      phoneNumber: userRecord.phoneNumber ?? null,
      disabled: userRecord.disabled ?? false,
      providerIds,
      createdAt: userRecord.metadata.creationTime
        ? new Date(userRecord.metadata.creationTime).toISOString()
        : now,
      lastSignInAt: userRecord.metadata.lastSignInTime
        ? new Date(userRecord.metadata.lastSignInTime).toISOString()
        : now,
      updatedAt: now,
    };

    const userDocRef = firebaseAdminFirestore.collection("users").doc(uid);
    const userDoc = await userDocRef.get().catch(() => null);
    const isNewUser = !userDoc || !userDoc.exists;

    await userDocRef.set(userData, { merge: true });

    if (isNewUser) {
      try {
        await sendNewUserNotification(userData);
      } catch (emailErr) {
        console.error("[userSync] Failed to send email notification for new user:", emailErr);
      }
    }

    return userData;
  } catch (error) {
    console.error(`[userSync] Failed to sync user ${uid} to Firestore:`, error);
    return null;
  }
}

