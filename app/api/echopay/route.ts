import { NextResponse } from 'next/server';
import { makeRes } from '../lib/makeRes';
import { getFirebaseApp } from '../lib/firebase';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

export type T_EchoPayRoute = {
    name: string, // Company name
    slug: string, // Unique identifier, e.g. "company-xyz"
    cto: number, // Card Turnover
    atv: number, // Average Transaction Value
    biz: number, // Business Card Percentage
    markdown: string, // Optional markdown description
}

export async function GET(req: Request) {
    try {
        // goldlabel-magento-store
        const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
        // Get the first query param key (if any)
        const queryKeys = Array.from(url.searchParams.keys());
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const companiesCol = collection(db, 'echopay');

        if (queryKeys.length > 0) {
            const slug = queryKeys[0];
            // Fetch all companies and find the one with the matching slug
            const snapshot = await getDocs(companiesCol);
            const companies = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as T_EchoPayRoute) }));
            const match = companies.find(company => company.slug === slug);
            if (match) {
                return NextResponse.json(makeRes({
                    severity: 'success',
                    message: match.name,
                    data: match,
                }));
            } else {
                return NextResponse.json(makeRes({
                    severity: 'error',
                    message: `No company found for slug: ${slug}`,
                    data: null,
                }), { status: 404 });
            }
        }

        // Default: return all companies
        const snapshot = await getDocs(companiesCol);
        const companies = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as T_EchoPayRoute) }));
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Lists Companies',
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
    markdown: 'Markdown (string)',
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
                message: `Invalid fields: ${missingFields.join(', ')}`
            }), { status: 400 });
        }
        const app = getFirebaseApp();
        const db = getFirestore(app);
        const companiesCol = collection(db, 'echopay');
        const companyWithTime = { ...body, time: Date.now() };
        const docRef = await addDoc(companiesCol, companyWithTime);
        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'Company added',
            data: { id: docRef.id, ...companyWithTime },
        }), { status: 201 });
    } catch (error) {
        return NextResponse.json(makeRes({
            severity: 'error',
            message: 'Failed to add Company: ' + (error instanceof Error ? error.message : String(error)),
        }), { status: 500 });
    }
}
