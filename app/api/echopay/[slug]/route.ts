import { NextResponse } from 'next/server';
import { makeRes } from '../../lib/makeRes';
import { getFirebaseApp } from '../../lib/firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request: Request, context: { params: { slug: string } }) {
    const { slug } = context.params;
    if (!slug) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'No slug provided in request.',
        }), { status: 400 });
    }
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const companiesCol = collection(db, 'echopay/data/companies');
        const q = query(companiesCol, where('slug', '==', slug));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return NextResponse.json(makeRes({
                severity: 'error',
                message: `No company found for slug: ${slug}`,
            }), { status: 404 });
        }
        const doc = snapshot.docs[0];
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Company found',
            data: { id: doc.id, ...doc.data() },
        }));
    } catch (error) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Failed to fetch company: ' + (error instanceof Error ? error.message : String(error)),
        }), { status: 500 });
    }
}
