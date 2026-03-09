import { getFirebaseFirestore } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export function subscribeToCollectionDocs(
    collectionName: string,
    onDocs: (docs: any[], typescript: any) => void
) {
    const firestore = getFirebaseFirestore();
    const colRef = collection(firestore, collectionName);
    return onSnapshot(colRef, (snapshot) => {
        const docs: any[] = [];
        let typescriptDoc: any = null;
        snapshot.docs.forEach(doc => {
            const docObj = { id: doc.id, ...doc.data() };
            if (doc.id === 'typescript') {
                typescriptDoc = docObj;
            } else {
                docs.push(docObj);
            }
        });
        onDocs(docs, typescriptDoc);
    });
}
