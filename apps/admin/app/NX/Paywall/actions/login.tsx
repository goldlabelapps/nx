import type { Dispatch } from 'redux';
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUbereduxKey } from '../../Uberedux';
import { setPaywall } from '../../Paywall';
import { getFirebaseAuth } from "../../lib/firebase";


export const login =
    (
        email: string, 
        password: string
    ): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                dispatch(setPaywall('loggingIn', true));
                
                const auth = getFirebaseAuth();
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                const userData = {
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName,
                };
                
                dispatch(setPaywall('user', userData));
                dispatch(setPaywall('loggingIn', false));

            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                dispatch(setPaywall('loggingIn', false));
            }
        };
