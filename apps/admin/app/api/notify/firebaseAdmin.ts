import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getMessaging as getAdminMessaging } from 'firebase-admin/messaging';

let adminApp: App | undefined;

function getAdminApp(): App {
    if (adminApp) return adminApp;
    if (getApps().length > 0) {
        adminApp = getApps()[0] as App;
        return adminApp;
    }

    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error(
            'Firebase Admin env vars are not set. ' +
            'Please configure FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, ' +
            'and FIREBASE_ADMIN_PRIVATE_KEY.',
        );
    }

    adminApp = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
    });

    return adminApp;
}

export { getAdminApp, getAdminMessaging };
