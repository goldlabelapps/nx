import { NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';
import { getFirebaseApp } from '../lib/firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
// import { verifyIdToken } from '../lib/firebase-admin';

export type T_EchoPayExample = {
    name: string, // Company name
    slug: string, // Unique identifier, e.g. "company-xyz"
    cto: number, // Card Turnover
    atv: number, // Average Transaction Value
    biz: number, // Business Card Percentage
}

export async function GET() {
    try {
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const companiesCol = collection(db, 'echopay/data/companies');
        const snapshot = await getDocs(companiesCol);
        const companies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Examples',
            data: companies,
        }));
    } catch (error) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Failed to fetch companies: ' + (error instanceof Error ? error.message : String(error)),
        }), { status: 500 });
    }
}


const fieldDescriptions: Record<string, string> = {
    name: 'Company name (string)',
    slug: 'Unique identifier, e.g. "company-xyz" (string)',
    cto: 'Card Turnover (number)',
    atv: 'Average Transaction Value (number)',
    biz: 'Business Card Percentage (number)',
};

function getMissingOrInvalidFields(obj: any): string[] {
    const missing: string[] = [];
    if (!obj || typeof obj !== 'object') {
        return Object.entries(fieldDescriptions).map(([key, desc]) => `${key}: ${desc}`);
    }
    if (typeof obj.name !== 'string') missing.push(`name: ${fieldDescriptions.name}`);
    if (typeof obj.slug !== 'string') missing.push(`slug: ${fieldDescriptions.slug}`);
    if (typeof obj.cto !== 'number') missing.push(`cto: ${fieldDescriptions.cto}`);
    if (typeof obj.atv !== 'number') missing.push(`atv: ${fieldDescriptions.atv}`);
    if (typeof obj.biz !== 'number') missing.push(`biz: ${fieldDescriptions.biz}`);
    return missing;
}

export async function POST(req: Request) {
    try {


        const body = await req.json();
        const missingFields = getMissingOrInvalidFields(body);
        if (missingFields.length > 0) {
            return NextResponse.json(makeRes({
                severity: 'error',
                message: `These fields are missing or invalid: ${missingFields.join(', ')}`
            }), { status: 400 });
        }
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const companiesCol = collection(db, 'echopay/data/companies');
        const docRef = await addDoc(companiesCol, body);
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Example added',
            data: { id: docRef.id, ...body },
        }), { status: 201 });
    } catch (error) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Failed to add Example: ' + (error instanceof Error ? error.message : String(error)),
        }), { status: 500 });
    }
}
