import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../lib/firebase";

export const firebaseLogin = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
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
