import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (server-side only)
// TEMPORARILY DISABLED - Fix Firebase credentials before uncommenting
/*
function initAdmin() {
    if (getApps().length === 0) {
        // Check if using full service account JSON or separate env vars
        const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

        if (serviceAccountJson) {
            // Parse the full service account JSON
            const serviceAccount = JSON.parse(serviceAccountJson);
            initializeApp({
                credential: cert(serviceAccount),
            });
        } else {
            // Use separate environment variables
            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
        }
    }
}

initAdmin();

export const adminDb = getFirestore();
*/

// Mock adminDb for development
export const adminDb = null as any;
