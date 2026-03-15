import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync } from '../../Async';
import { getFirebaseFirestore } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const activeSubscriptions: Record<string, boolean> = {};

export const subscribeDoc = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const { docId, subscribed } = getState().redux.async || {};
            if (!subscribed && docId && !activeSubscriptions[docId]) {
                activeSubscriptions[docId] = true;
                const firestore = getFirebaseFirestore();
                const docRef = doc(firestore, 'async', docId);
                onSnapshot(docRef, (snapshot) => {
                    const docData = snapshot.exists() ? snapshot.data() : null;
                    dispatch(setAsync('subscribed', docData));
                });
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };