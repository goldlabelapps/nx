import type { Dispatch } from 'redux';
import { signOut } from "firebase/auth";
import { setUbereduxKey } from '@nx/uberedux';
import { setPaywall } from '../../Paywall';
import { getFirebaseAuth } from "../../lib/firebase";


export const logout =
    (): any =>
        async (dispatch: Dispatch, getState: () => any) => {
            try {
                const auth = getFirebaseAuth();
                await signOut(auth);
                
                dispatch(setPaywall('user', null));

            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
            }
        };
