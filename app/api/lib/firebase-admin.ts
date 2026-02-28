import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';


function getAdminCredential() {
    const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (base64) {
        try {
            const jsonStr = Buffer.from(base64, 'base64').toString('utf8');
            const serviceAccount = JSON.parse(jsonStr);
            console.log('[FIREBASE_ADMIN] Decoded service account:', serviceAccount);
            return cert(serviceAccount);
        } catch (e) {
            throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64: ' + (e instanceof Error ? e.message : String(e)));
        }
    }
    // Fallback to individual env vars
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey && privateKey.includes('\\n')) {
        privateKey = privateKey.replace(/\\n/g, '\n');
    }
    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase Admin credentials: FIREBASE_SERVICE_ACCOUNT_BASE64 or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.');
    }
    return cert({ projectId, clientEmail, privateKey });
}

const firebaseAdminConfig = {
    credential: getAdminCredential(),
};

export function getFirebaseAdminApp() {
    if (!getApps().length) {
        return initializeApp(firebaseAdminConfig);
    }
    return getApp();
}

export function verifyIdToken(token: string) {
    const app = getFirebaseAdminApp();
    return getAuth(app).verifyIdToken(token);
}
