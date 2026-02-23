
import { NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';
import { getFirebaseApp } from '../lib/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export async function GET() {
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const companiesCol = collection(db, 'echopay/data/companies');
        const snapshot = await getDocs(companiesCol);
        const companies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Companies retrieved',
            data: companies,
        }));
    } catch (error) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Failed to fetch companies: ' + (error instanceof Error ? error.message : String(error)),
        }), { status: 500 });
    }
}
