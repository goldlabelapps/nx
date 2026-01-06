
import { adminDb } from './firebase-admin';
import type { Doc } from './firestore-service';

export async function createHomeMarkdown({ sitename, description, namespace }: { sitename: string; description: string; namespace: string }) {
    if (!adminDb) throw new Error('Firebase not configured');
    const now = new Date().toISOString();
    const doc: Doc = {
        id: '/',
        content: `> # ${sitename}\n\n${description}`,
        published: true,
        createdAt: now,
        updatedAt: now,
        frontmatter: {
            title: sitename,
            slug: '/',
            order: 1,
            description,
            author: namespace,
            icon: 'goldlabel',
            tags: 'homepage',
            image: '',
        },
    };
    await adminDb.collection('markdown').doc('/').set(doc);
    return doc;
}

