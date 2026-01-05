import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/goldlabel/lib/firebase-admin';
import type { TApiResponse } from '@/goldlabel/types';
import packageJson from '@/package.json';

/**
 * CRUDITOR - Universal CRUD operations handler for Firestore
 * Handles Create, Read, Update, Delete operations for any collection
 */

// GET - Read documents from a collection
export async function GET(request: NextRequest) {
    // TEMPORARILY DISABLED - Firebase not configured
    const response: TApiResponse = {
        time: Date.now(),
        app: packageJson.name,
        feedback: {
            status: 'error',
            title: 'Firebase Disabled',
            description: 'Firebase connection is temporarily disabled. Configure credentials to enable API.'
        },
        request: {
            method: 'GET',
            action: 'read',
            params: {}
        },
        response: {}
    };
    return NextResponse.json(response, { status: 503 });

    /* COMMENTED OUT - Firebase not configured
    try {
        const { searchParams } = new URL(request.url);
        const collection = searchParams.get('collection') || 'markdown';
        const docId = searchParams.get('id');

        // If docId is provided, fetch a single document
        if (docId) {
            const docRef = adminDb.collection(collection).doc(docId);
            const doc = await docRef.get();

            if (!doc.exists) {
                const response: TApiResponse = {
                    time: Date.now(),
                    app: packageJson.name,
                    feedback: {
                        status: 'error',
                        title: 'Document Not Found',
                        description: `Document ${docId} does not exist in ${collection} collection`
                    },
                    request: {
                        method: 'GET',
                        action: 'read-document',
                        params: { collection, docId }
                    },
                    response: {}
                };
                return NextResponse.json(response, { status: 404 });
            }

            const response: TApiResponse = {
                time: Date.now(),
                app: packageJson.name,
                feedback: {
                    status: 'success',
                    title: 'Document Retrieved',
                    description: `Successfully fetched document from ${collection}`
                },
                request: {
                    method: 'GET',
                    action: 'read-document',
                    params: { collection, docId }
                },
                response: {
                    id: doc.id,
                    data: doc.data()
                }
            };
            return NextResponse.json(response);
        }

        // Otherwise, fetch all documents from the collection
        const snapshot = await adminDb.collection(collection).get();
        const docs = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        }));

        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'success',
                title: 'Collection Retrieved',
                description: `Successfully fetched ${docs.length} documents from ${collection}`
            },
            request: {
                method: 'GET',
                action: 'read-collection',
                params: { collection }
            },
            response: {
                count: docs.length,
                data: docs
            }
        };
        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Cruditor GET error:', error);
        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'error',
                title: 'Read Operation Failed',
                description: error.message || 'Failed to read from Firestore'
            },
            request: {
                method: 'GET',
                action: 'read',
                params: { error: error.code }
            },
            response: {}
        };
        return NextResponse.json(response, { status: 500 });
    }
    */
}

// POST - Create a new document
export async function POST(request: NextRequest) {
    // TEMPORARILY DISABLED - Firebase not configured
    const response: TApiResponse = {
        time: Date.now(),
        app: packageJson.name,
        feedback: {
            status: 'error',
            title: 'Firebase Disabled',
            description: 'Firebase connection is temporarily disabled. Configure credentials to enable API.'
        },
        request: {
            method: 'POST',
            action: 'create',
            params: {}
        },
        response: {}
    };
    return NextResponse.json(response, { status: 503 });
}

// PUT - Update an existing document
export async function PUT(request: NextRequest) {
    // TEMPORARILY DISABLED - Firebase not configured
    const response: TApiResponse = {
        time: Date.now(),
        app: packageJson.name,
        feedback: {
            status: 'error',
            title: 'Firebase Disabled',
            description: 'Firebase connection is temporarily disabled. Configure credentials to enable API.'
        },
        request: {
            method: 'PUT',
            action: 'update',
            params: {}
        },
        response: {}
    };
    return NextResponse.json(response, { status: 503 });
}

// DELETE - Delete a document
export async function DELETE(request: NextRequest) {
    // TEMPORARILY DISABLED - Firebase not configured
    const response: TApiResponse = {
        time: Date.now(),
        app: packageJson.name,
        feedback: {
            status: 'error',
            title: 'Firebase Disabled',
            description: 'Firebase connection is temporarily disabled. Configure credentials to enable API.'
        },
        request: {
            method: 'DELETE',
            action: 'delete',
            params: {}
        },
        response: {}
    };
    return NextResponse.json(response, { status: 503 });
}
