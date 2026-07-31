import type { Dispatch } from 'redux';
import { doc, updateDoc } from 'firebase/firestore';
import { setFeedback } from '../../../../DesignSystem';
import { setUbereduxKey } from '../../../../Uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';

export const updateFingerprint = (
    id: string,
    key: string,
    value: any,
): any =>
    async (dispatch: Dispatch) => {
        try {
            if (!id || typeof id !== 'string') {
                return false;
            }

            const db = getFirebaseFirestore();
            const docRef = doc(db, 'fingerprints', id);
            await updateDoc(docRef, {
                [key]: value,
                updated: Date.now(),
            });

            dispatch(setFeedback({
                severity: 'success',
                title: `Updated ${key}`,
            }));
            return true;
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
            return false;
        }
    };