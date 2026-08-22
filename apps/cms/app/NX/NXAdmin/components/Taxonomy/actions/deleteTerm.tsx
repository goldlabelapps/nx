import type { T_UbereduxDispatch } from '../../../../types';
import { doc, deleteDoc } from 'firebase/firestore';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';
import type { T_TaxonomyCollection } from '../types';

export const deleteTerm =
    (taxonomy: T_TaxonomyCollection, id: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!id || typeof id !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await deleteDoc(doc(db, taxonomy, id));

                dispatch(setFeedback({ severity: 'success', title: 'Term deleted' }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
