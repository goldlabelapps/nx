import type { Dispatch } from 'redux';
// import { setUbereduxKey } from '../../Uberedux';
import { setCRUD} from '../../NXAdmin';
import { getFirebaseFirestore } from '../../lib/firebase'

export const edit = (
    collection: string,
    data: any,
): any =>
    async (dispatch: Dispatch) => {
        try {
            const firestore = getFirebaseFirestore();
            const { addDoc, collection: col } = await import('firebase/firestore');
            const colRef = col(firestore, collection);
            const docRef = await addDoc(colRef, data);
            const newDoc = { id: docRef.id, ...data };
            dispatch(setCRUD(collection, 'selected', newDoc));
            dispatch(setCRUD(collection, 'mode', 'read'));
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setCRUD(collection, 'saving', false));
            dispatch(setCRUD(collection, 'error', msg));
        } finally {
            dispatch(setCRUD(collection, 'saving', false));
        }
    };
