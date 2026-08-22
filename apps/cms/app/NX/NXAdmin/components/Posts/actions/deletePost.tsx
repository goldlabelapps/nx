import type { T_UbereduxDispatch } from '../../../../types';
import { doc, deleteDoc } from 'firebase/firestore';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

// Permanent delete. Callers should route through trashPost() first.
export const deletePost =
    (id: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!id || typeof id !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await deleteDoc(doc(db, 'posts', id));

                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Post permanently deleted',
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
