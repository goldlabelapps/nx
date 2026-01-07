import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK (server-side only)
function initAdmin() {
    if (getApps().length === 0) {
        // Prefer FIREBASE_SERVICE_ACCOUNT_BASE64 if present
        const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
        let serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (base64) {
            try {
                serviceAccountJson = Buffer.from(base64, 'base64').toString('utf8');
            } catch (e) {
                console.error('Failed to decode FIREBASE_SERVICE_ACCOUNT_BASE64:', e);
            }
        }

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
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\n/g, '\n'),
                }),
            });
        }
    }
}

initAdmin();

export const adminDb = getFirestore();
