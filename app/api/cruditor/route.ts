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
        const docs = snapshot.docs.map(doc => ({
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
}

// POST - Create a new document
export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const collection = searchParams.get('collection') || 'markdown';
        const body = await request.json();

        // Add timestamps
        const docData = {
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await adminDb.collection(collection).add(docData);
        const newDoc = await docRef.get();

        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'success',
                title: 'Document Created',
                description: `Successfully created new document in ${collection} collection`
            },
            request: {
                method: 'POST',
                action: 'create-document',
                params: { collection }
            },
            response: {
                id: newDoc.id,
                data: newDoc.data()
            }
        };
        return NextResponse.json(response, { status: 201 });

    } catch (error: any) {
        console.error('Cruditor POST error:', error);
        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'error',
                title: 'Create Operation Failed',
                description: error.message || 'Failed to create document'
            },
            request: {
                method: 'POST',
                action: 'create-document',
                params: { error: error.code }
            },
            response: {}
        };
        return NextResponse.json(response, { status: 500 });
    }
}

// PUT - Update an existing document
export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const collection = searchParams.get('collection') || 'markdown';
        const docId = searchParams.get('id');

        if (!docId) {
            const response: TApiResponse = {
                time: Date.now(),
                app: packageJson.name,
                feedback: {
                    status: 'error',
                    title: 'Missing Document ID',
                    description: 'Document ID is required for update operation'
                },
                request: {
                    method: 'PUT',
                    action: 'update-document',
                    params: { collection }
                },
                response: {}
            };
            return NextResponse.json(response, { status: 400 });
        }

        const body = await request.json();
        const docRef = adminDb.collection(collection).doc(docId);

        // Check if document exists
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
                    method: 'PUT',
                    action: 'update-document',
                    params: { collection, docId }
                },
                response: {}
            };
            return NextResponse.json(response, { status: 404 });
        }

        // Update document with timestamp
        const updateData = {
            ...body,
            updatedAt: new Date().toISOString()
        };

        await docRef.update(updateData);
        const updatedDoc = await docRef.get();

        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'success',
                title: 'Document Updated',
                description: `Successfully updated document in ${collection} collection`
            },
            request: {
                method: 'PUT',
                action: 'update-document',
                params: { collection, docId }
            },
            response: {
                id: updatedDoc.id,
                data: updatedDoc.data()
            }
        };
        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Cruditor PUT error:', error);
        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'error',
                title: 'Update Operation Failed',
                description: error.message || 'Failed to update document'
            },
            request: {
                method: 'PUT',
                action: 'update-document',
                params: { error: error.code }
            },
            response: {}
        };
        return NextResponse.json(response, { status: 500 });
    }
}

// DELETE - Delete a document
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const collection = searchParams.get('collection') || 'markdown';
        const docId = searchParams.get('id');

        if (!docId) {
            const response: TApiResponse = {
                time: Date.now(),
                app: packageJson.name,
                feedback: {
                    status: 'error',
                    title: 'Missing Document ID',
                    description: 'Document ID is required for delete operation'
                },
                request: {
                    method: 'DELETE',
                    action: 'delete-document',
                    params: { collection }
                },
                response: {}
            };
            return NextResponse.json(response, { status: 400 });
        }

        const docRef = adminDb.collection(collection).doc(docId);

        // Check if document exists
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
                    method: 'DELETE',
                    action: 'delete-document',
                    params: { collection, docId }
                },
                response: {}
            };
            return NextResponse.json(response, { status: 404 });
        }

        await docRef.delete();

        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'success',
                title: 'Document Deleted',
                description: `Successfully deleted document from ${collection} collection`
            },
            request: {
                method: 'DELETE',
                action: 'delete-document',
                params: { collection, docId }
            },
            response: {
                id: docId
            }
        };
        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Cruditor DELETE error:', error);
        const response: TApiResponse = {
            time: Date.now(),
            app: packageJson.name,
            feedback: {
                status: 'error',
                title: 'Delete Operation Failed',
                description: error.message || 'Failed to delete document'
            },
            request: {
                method: 'DELETE',
                action: 'delete-document',
                params: { error: error.code }
            },
            response: {}
        };
        return NextResponse.json(response, { status: 500 });
    }
}
