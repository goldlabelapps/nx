import { useEffect, useState } from "react";
import { getFirebaseAuth } from "../../lib/firebase";
import { User } from "firebase/auth";
import { setPaywall} from '../../Paywall';
import { setTing } from '../../Async';

/**
 * useAuthed - React hook to get Firebase auth state
 * Returns: User object if authenticated, null otherwise
 */
export function useAuthed(): User | null {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const auth = getFirebaseAuth();
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser ?? null);
			setPaywall('user', firebaseUser ?? null);
			setTing('subscribed', {
				dsakf: 1
			});
		});
		return () => unsubscribe();
	}, []);

	return user;
}
