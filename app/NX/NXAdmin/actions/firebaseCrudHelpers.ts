import { getFirebaseFirestore } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export function subscribeToCollectionDocs(collectionName: string, onDocs: (docs: any[]) => void) {
    const firestore = getFirebaseFirestore();
    const colRef = collection(firestore, collectionName);
    return onSnapshot(colRef, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        onDocs(docs);
    });
}
