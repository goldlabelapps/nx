import type { T_Severity } from '../../types'
import { NextResponse } from 'next/server';
import { getFirebaseApp } from '../../lib/firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import {
    makeRes,
    // getEndpoints, 
} from '../../';
import { getFirebaseAdminApp } from '../../lib/firebase-admin';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        let slug = url.searchParams.get('slug');
        // Fallback: extract slug from path if not present in search params
        if (!slug) {
            const parts = url.pathname.split('/').filter(Boolean);
            // Find the last part after /share/
            const shareIndex = parts.indexOf('share');
            if (shareIndex !== -1 && parts.length > shareIndex + 1) {
                slug = parts[shareIndex + 1];
            }
        }
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const firebaseCollection = collection(db, 'share');

        if (slug) {
            // Query Firestore for matching slug
            const { query, where, limit, getDocs } = await import('firebase/firestore');
            const q = query(firebaseCollection, where('slug', '==', slug), limit(1));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                return NextResponse.json(makeRes({
                    severity: 'error',
                    message: `slug: ${slug} not found`,
                }), { status: 404 });
            } else {
                const doc = snapshot.docs[0];
                return NextResponse.json(makeRes({
                    severity: 'success',
                    message: `slug: ${slug}`,
                    data: { id: doc.id, ...doc.data() },
                }), { status: 200 });
            }
        }

        // If no slug, return error
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Missing slug parameter',
        }), { status: 400 });

    } catch (error) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Failed to fetch companies: ' + (error instanceof Error ? error.message : String(error)),
        }), { status: 500 });
    }
}
