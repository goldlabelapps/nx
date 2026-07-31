import type { T_UbereduxDispatch } from '../../../../types';
import { doc, deleteDoc } from 'firebase/firestore';
import { setUbereduxKey } from '../../../../Uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

const VIRUS_JUST_DELETED_SESSION_KEY = 'virus.justDeletedProspect';

export const deleteProspect =
    (prospect: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!prospect || typeof prospect !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await deleteDoc(doc(db, 'prospects', prospect));

                if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem(VIRUS_JUST_DELETED_SESSION_KEY, '1');
                }

                dispatch(setFeedback({
                    severity: 'success',
                    title: `${prospect} deleted.`,
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
