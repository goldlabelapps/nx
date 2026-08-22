import type { Dispatch } from 'redux';
import { setUbereduxKey } from '@nx/uberedux';
import { setNXAdmin } from '../../../../NXAdmin';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

export const initPosts = (): any =>
    async (dispatch: Dispatch) => {
        try {
            const db = getFirebaseFirestore();
            const colRef = collection(db, 'posts');
            let totalDocs = 0;
            try {
                const snapshot = await getCountFromServer(colRef);
                totalDocs = snapshot.data().count || 0;
            } catch (err) {
                // fallback: leave totalDocs as 0 if error
            }
            await dispatch(setNXAdmin('posts', {
                initialized: true,
                totalDocs,
            }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
