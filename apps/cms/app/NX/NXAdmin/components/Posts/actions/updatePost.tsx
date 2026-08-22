import type { T_UbereduxDispatch } from '../../../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

export const updatePost =
    (id: string, changes: Record<string, any>): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!id || typeof id !== 'string') {
                    return false;
                }

                const now = new Date().toISOString();
                const nextChanges: Record<string, any> = { ...changes, updatedAt: now };
                if (changes.status === 'published' && !changes.publishedAt) {
                    nextChanges.publishedAt = now;
                }

                const db = getFirebaseFirestore();
                await updateDoc(doc(db, 'posts', id), nextChanges);

                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Post updated',
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
