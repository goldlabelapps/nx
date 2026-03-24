import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setPaywall } from '../../Paywall';
import { getFirebaseApp, getFirebaseFirestore } from "../../lib/firebase";

export const subscribeAccount = (): any =>
async (dispatch: Dispatch, getState: () => any) => {
    try {

        const uid = getState()?.redux?.paywall?.uid ?? null;

        if (!uid) {
            dispatch(setPaywall('error', 'No UID found'));
            return;
        }

        const firestore = getFirebaseFirestore();
        const { collection, query, where, onSnapshot } = await import('firebase/firestore');
        const accountsRef = collection(firestore, 'accounts');
        const q = query(accountsRef, where('uid', '==', uid));

        // Subscribe to the document(s) with matching uid
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                dispatch(setPaywall('error', 'No account found for this uid'));
                dispatch(setPaywall('account', null));
            } else {
                // If multiple docs, just take the first
                const doc = snapshot.docs[0];
                dispatch(setPaywall('account', { id: doc.id, ...doc.data() }));
                dispatch(setPaywall('error', null));
            }
            dispatch(setPaywall('accountSubscribing', false));
        }, (error) => {
            dispatch(setPaywall('error', error.message || 'Error subscribing to account'));
            dispatch(setPaywall('accountSubscribing', false));
        });

        // No return value; subscription is managed internally
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
};