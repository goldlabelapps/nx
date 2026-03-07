import { NextResponse } from 'next/server';
import { makeRes, getEndpoints } from '../';
import { getFirebaseApp } from '../lib/firebase';
import { getFirestore } from 'firebase/firestore';

export async function GET() {
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const collectionsSnap = await db.listCollections();
        const collections = collectionsSnap.map(col => col.id);

        const res = makeRes({
            severity: 'success',
            message: 'Firebase collections',
            data: collections,
        });
        return NextResponse.json(res);
    } catch (error) {
        const res = makeRes({
            severity: 'error',
            message: 'Failed to fetch collections',
            data: error instanceof Error ? error.message : String(error),
        });
        return NextResponse.json(res);
    }
}
