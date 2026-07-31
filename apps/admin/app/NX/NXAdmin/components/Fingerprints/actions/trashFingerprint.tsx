import type { T_UbereduxDispatch } from '../../../../types';
import { doc, updateDoc } from 'firebase/firestore';
import { setUbereduxKey } from '../../../../Uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

export const trashFingerprint =
    (fingerprint: string): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                if (!fingerprint || typeof fingerprint !== 'string') {
                    return false;
                }

                const db = getFirebaseFirestore();
                await updateDoc(doc(db, 'fingerprints', fingerprint), { trash: true });

                dispatch(setFeedback({
                    severity: 'success',
                    title: `${fingerprint} moved to trash.`,
                }));
                return true;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return false;
            }
        };
