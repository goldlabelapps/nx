
import { signInWithEmailAndPassword } from "firebase/auth";
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
