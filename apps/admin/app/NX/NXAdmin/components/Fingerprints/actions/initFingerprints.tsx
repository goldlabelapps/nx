import type { Dispatch } from 'redux';

import { setUbereduxKey } from '../../../../Uberedux';
import { setNXAdmin } from '../../../../NXAdmin';

import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

export const initFingerprints = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // Always fetch total document count from fingerprints collection
            const db = getFirebaseFirestore();
            const colRef = collection(db, 'fingerprints');
            let totalDocs = 0;
            try {
                const snapshot = await getCountFromServer(colRef);
                totalDocs = snapshot.data().count || 0;
            } catch (err) {
                // fallback: leave totalDocs as 0 if error
            }
            await dispatch(setNXAdmin('fingerprints', {
                initialized: true,
                totalDocs,
            }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
