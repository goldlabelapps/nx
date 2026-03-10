import type { Dispatch } from 'redux';
import { setCRUD} from '../../NXAdmin';
import { getFirebaseFirestore } from '../../lib/firebase'

export const collectionDelete = (
    collection: string,
    selected: any,
): any =>
    async (dispatch: Dispatch) => {
        try {
            const { id } = selected;
            const firestore = getFirebaseFirestore();
            const { doc, deleteDoc } = await import('firebase/firestore');
            const docRef = doc(firestore, collection, id);
            await deleteDoc(docRef);
            dispatch(setCRUD(collection, 'mode', 'read'));
            dispatch(setCRUD(collection, 'selected', null));
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setCRUD(collection, 'saving', false));
            dispatch(setCRUD(collection, 'error', msg));
        } finally {
            dispatch(setCRUD(collection, 'saving', false));
        }
    };
