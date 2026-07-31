import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { setPaywall } from '../../Paywall';

export const avatarsByUID = () =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            // console.log("avatarCRUD", action);
            const uid = getState()?.redux?.paywall?.uid ?? null;
            if (!uid) return;

            const { getFirebaseFirestore } = await import('../../lib/firebase');
            const firestore = getFirebaseFirestore();
            const { collection, query, where, onSnapshot } = await import('firebase/firestore');
            const avatarsRef = collection(firestore, 'avatars');
            const q = query(avatarsRef, where('uid', '==', uid));
            
            // Subscribe to the document(s) with matching uid   
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const avatars: any = {};
                snapshot.forEach((doc) => {
                    avatars[doc.id] = doc.data();
                });
                dispatch(setPaywall('avatarsByUID', avatars));
            }, (error) => {
                dispatch(setPaywall('error', error.message || 'Error subscribing to avatars'));
            });

        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
