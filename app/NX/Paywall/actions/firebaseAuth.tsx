import type { Dispatch } from 'redux';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../lib/firebase";
import { useDispatch } from '../../Uberedux';
import {setFeedback} from '../../DesignSystem';


export const firebaseLogin = async (email: string, password: string, dispatch: Dispatch) => {
    const auth = getFirebaseAuth();
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error: any) {
        dispatch(setFeedback({ severity: 'error', title: 'Login failed', description: error.message }));
        throw error;
    }
};

export const firebaseLogout = async () => {
    const auth = getFirebaseAuth();
    try {
        const result = await signOut(auth);
        return;
    } catch (error) {
        throw error;
    }
};
