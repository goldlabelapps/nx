import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setNXAdmin } from '../../NXAdmin';
import { getFirebaseFirestore } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const activeSubscriptions: Record<string, boolean> = {};

export const subscribeUser = (): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const { subscribedUser } = getState().redux.nxadmin || {};
            const { firebaseUser } = getState().redux.paywall || {};
            const { uid } = firebaseUser || {};
            if (!uid) return;

            // Guard: only subscribe if not already subscribed to this uid
            if (!subscribedUser || subscribedUser.uid !== uid) {
                dispatch(setNXAdmin('subscribedUser', { uid }));
                if (!activeSubscriptions[uid]) {
                    activeSubscriptions[uid] = true;
                    const firestore = getFirebaseFirestore();
                    // Query for the document in 'users' collection where 'uid' field matches
                    const { query, collection, where, onSnapshot } = await import('firebase/firestore');
                    const usersCol = collection(firestore, 'users');
                    const q = query(usersCol, where('uid', '==', uid));
                    onSnapshot(q, (snapshot) => {
                        let docData = null;
                        snapshot.forEach(doc => {
                            docData = { id: doc.id, ...doc.data() };
                        });
                        dispatch(setNXAdmin('subscribedUser', docData));
                    });
                }
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };