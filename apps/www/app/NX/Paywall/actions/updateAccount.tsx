import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setPaywall } from '../../Paywall';
import { setFeedback } from '../../DesignSystem';
import { getFirebaseFirestore } from "../../lib/firebase";

export const updateAccount = (
    key: string, 
    value: any,
    successMsg?: string
): any =>
async (dispatch: Dispatch, getState: () => any) => {
    try {
        const uid = getState()?.redux?.paywall?.uid ?? null;
        if (!uid) {
            dispatch(setPaywall('error', 'No UID found'));
            return;
        }
        const firestore = getFirebaseFirestore();
        const { collection, query, where, getDocs, updateDoc } = await import('firebase/firestore');
        const accountsRef = collection(firestore, 'accounts');
        const q = query(accountsRef, where('uid', '==', uid));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            dispatch(setPaywall('error', 'Account not found'));
            dispatch(setFeedback({ 
                severity: 'warning', 
                title: 'Account not found', 
                description: uid,
            }));     
            return;
        }
        const docRef = snapshot.docs[0].ref;
        const updateObj: Record<string, any> = {};
        updateObj[key] = value;
        updateObj['updated'] = Date.now();
        await updateDoc(docRef, updateObj);
        dispatch(setFeedback({
            severity: 'info',
            title: successMsg || 'Account updated',
        }));
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
};