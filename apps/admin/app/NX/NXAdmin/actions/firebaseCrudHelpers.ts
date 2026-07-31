import { getFirebaseFirestore } from '../../lib/firebase';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';

type CollectionQueryOptions = {
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    searchTerm?: string;
};

function normalizeSearchValue(value: unknown) {
    if (typeof value !== 'string') return '';
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '');
}

function matchesSearchTerm(doc: Record<string, unknown>, searchTerm?: string) {
    const normalizedTerm = normalizeSearchValue(searchTerm ?? '');
    if (!normalizedTerm) return true;

    const fullNameFromParts = [
        doc.first_name,
        doc.firstName,
        doc.last_name,
        doc.lastName,
    ].filter((value) => typeof value === 'string' && value.trim().length > 0).join(' ');

    const candidates = [
        doc.id,
        doc.name,
        doc.fullname,
        doc.fullName,
        doc.full_name,
        fullNameFromParts,
        doc.email,
        doc.company,
    ];

    return candidates.some((value) => {
        const normalizedCandidate = normalizeSearchValue(value);
        if (!normalizedCandidate) return false;
        return normalizedCandidate.includes(normalizedTerm);
    });
}

function buildCollectionQuery(collectionName: string, options: CollectionQueryOptions = {}) {
    const firestore = getFirebaseFirestore();
    const colRef = collection(firestore, collectionName);

    if (!options.orderByField) {
        return colRef;
    }

    return query(colRef, orderBy(options.orderByField, options.orderDirection ?? 'asc'));
}

function parseCollectionSnapshot(snapshot: any) {
    const docs: any[] = [];
    let typescriptDoc: any = null;

    snapshot.docs.forEach((doc: any) => {
        const docObj = { id: doc.id, ...doc.data() };
        if (doc.id === 'typescript') {
            typescriptDoc = docObj;
        } else {
            docs.push(docObj);
        }
    });

    return { docs, typescript: typescriptDoc };
}

export async function fetchCollectionDocs(
    collectionName: string,
    options: CollectionQueryOptions = {},
) {
    const snapshot = await getDocs(buildCollectionQuery(collectionName, options));
    const parsed = parseCollectionSnapshot(snapshot);
    return {
        ...parsed,
        docs: parsed.docs.filter((doc) => matchesSearchTerm(doc, options.searchTerm)),
    };
}

export function subscribeToCollectionDocs(
    collectionName: string,
    onDocs: (docs: any[], typescript: any) => void,
    options: CollectionQueryOptions = {},
) {
    return onSnapshot(buildCollectionQuery(collectionName, options), (snapshot) => {
        const { docs, typescript } = parseCollectionSnapshot(snapshot);
        onDocs(docs.filter((doc) => matchesSearchTerm(doc, options.searchTerm)), typescript);
    });
}
