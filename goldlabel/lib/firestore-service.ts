import { adminDb } from './firebase-admin';

export interface Doc {
    id: string;
    content: string; // Markdown content
    published: boolean;
    createdAt: string;
    updatedAt: string;
    frontmatter?: {
        title?: string;
        slug?: string;
        order?: number;
        description?: string;
        image?: string; // Featured image URL
        icon?: string;
        tags?: string; // Comma-separated tags
        author?: string;
        category?: string;
    };
}

export interface FirestoreError {
    code: string;
    message: string;
    indexUrl?: string;
}

/**
 * Fetch all published documents from Firestore
 * Used for SSG to generate all static paths at build time
 */
export async function getAllDocs(): Promise<Doc[]> {
    // TEMPORARILY DISABLED - Firebase not configured
    console.warn('Firebase disabled - returning mock data');
    return [];

    /*
    try {
        const snapshot = await adminDb
            .collection('markdown')
            .where('published', '==', true)
            .orderBy('updatedAt', 'desc')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Doc[];
    } catch (error: any) {
        console.error('Error fetching all docs:', error);

        // Check if it's a missing index error
        if (error?.code === 9 || error?.message?.includes('requires an index')) {
            const indexUrlMatch = error?.message?.match(/https:\/\/console\.firebase\.google\.com[^\s]+/);
            const firestoreError: FirestoreError = {
                code: 'MISSING_INDEX',
                message: 'Firebase query requires a database index to be created.',
                indexUrl: indexUrlMatch ? indexUrlMatch[0] : undefined
            };
            throw firestoreError;
        }

        // Throw other errors with details
        throw {
            code: 'FIRESTORE_ERROR',
            message: error?.message || 'Failed to connect to Firebase'
        } as FirestoreError;
    }
    */
}

/**
 * Fetch a single document by slug
 * Used for SSG to generate static content for each page
 */
export async function getDocBySlug(slug: string): Promise<Doc | null> {
    // TEMPORARILY DISABLED - Firebase not configured
    console.warn('Firebase disabled - getDocBySlug returning null for:', slug);
    return null;

    /*
    try {
        const snapshot = await adminDb
            .collection('markdown')
            .where('frontmatter.slug', '==', slug)
            .where('published', '==', true)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data(),
        } as Doc;
    } catch (error) {
        console.error('Error fetching doc by slug:', error);
        return null;
    }
    */
}

/**
 * Get all slugs for static path generation
 */
export async function getAllSlugs(): Promise<string[]> {
    try {
        const docs = await getAllDocs();
        return docs.map(doc => doc.frontmatter?.slug).filter(Boolean) as string[];
    } catch (error) {
        console.error('Error fetching slugs:', error);
        return [];
    }
}
