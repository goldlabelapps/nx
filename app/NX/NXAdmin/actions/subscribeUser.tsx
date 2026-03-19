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
            console.log('subscribedUser', subscribedUser);
            if (!subscribedUser) {
                dispatch(setNXAdmin('subscribedUser', {uid:1123}));
            }

            // const { docId, subscribed } = getState().redux.nxadmin || {};
            // if (!subscribed && docId && !activeSubscriptions[docId]) {
            //     activeSubscriptions[docId] = true;
            //     const firestore = getFirebaseFirestore();
            //     const docRef = doc(firestore, 'nxadmin', docId);
            //     onSnapshot(docRef, (snapshot) => {
            //         const docData = snapshot.exists() ? snapshot.data() : null;
            //         dispatch(setNXAdmin('subscribedUser', docData));
            //     });
            // }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };