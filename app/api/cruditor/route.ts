import { NextRequest, NextResponse } from 'next/server';


import packageJson from '@/package.json';

/**
 * CRUDITOR - Universal CRUD operations handler
 * Handles Create, Read, Update, Delete operations for any collection
 */

// GET - Read documents from a collection
export async function GET(request: NextRequest) {
    // TEMPORARILY DISABLED - Firebase not configured
    const response = {
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

    // All Firestore logic removed
}

// POST - Create a new document
export async function POST(request: NextRequest) {
    // TEMPORARILY DISABLED - Firebase not configured
    const response = {
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
    const response = {
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
    const response = {
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
