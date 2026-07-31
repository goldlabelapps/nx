import type { T_UbereduxDispatch } from '../../../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { setUbereduxKey } from '../../../../Uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

export const trashProspect =
    (prospect: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!prospect || typeof prospect !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await updateDoc(doc(db, 'prospects', prospect), { trash: true });

                dispatch(setFeedback({
                    severity: 'success',
                    title: `${prospect} moved to trash.`,
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
