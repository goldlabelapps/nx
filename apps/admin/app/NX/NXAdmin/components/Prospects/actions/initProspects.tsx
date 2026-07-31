
import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../../../Uberedux';
import { setNXAdmin } from '../../../../NXAdmin';
import { setProspects } from '../';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

export const initProspects = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // Always fetch total document count from prospects collection
            const db = getFirebaseFirestore();
            const colRef = collection(db, 'prospects');
            let totalDocs = 0;
            try {
                const snapshot = await getCountFromServer(colRef);
                totalDocs = snapshot.data().count || 0;
            } catch (err) {
                // fallback: leave totalDocs as 0 if error
            }
            await dispatch(setNXAdmin('prospects', {
                initialized: true,
                totalDocs,
            }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };

    