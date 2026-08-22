import type { T_UbereduxDispatch } from '../../../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

export const trashPost =
    (id: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!id || typeof id !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await updateDoc(doc(db, 'posts', id), {
                    status: 'trash',
                    updatedAt: new Date().toISOString(),
                });

                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Post moved to trash',
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
