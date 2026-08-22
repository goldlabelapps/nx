import type { T_UbereduxDispatch } from '../../../../types';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore, getFirebaseStorage } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

export const deleteMedia =
    (id: string, storagePath: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!id || typeof id !== 'string') {
                    return false;
                }

                const storage = getFirebaseStorage();
                await deleteObject(ref(storage, storagePath));

                const db = getFirebaseFirestore();
                await deleteDoc(doc(db, 'media', id));

                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Media deleted',
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
