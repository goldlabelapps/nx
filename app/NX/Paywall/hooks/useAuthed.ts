"use client";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "../../lib/firebase";
import { User } from "firebase/auth";
import { setPaywall} from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { setTing } from '../../Async';

/**
 * useAuthed - React hook to get Firebase auth state
 * Returns: User object if authenticated, null otherwise
 */
export function useAuthed(): User | null {
	const [user, setUser] = useState<User | null>(null);
	const dispatch = useDispatch();
	useEffect(() => {
		const auth = getFirebaseAuth();
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser ?? null);
			dispatch(setPaywall('user', null));
			if (firebaseUser) {
				const { uid, email, emailVerified, isAnonymous, providerData, displayName, photoURL } = firebaseUser;
				const safeUser = {
					uid,
					email,
					emailVerified,
					isAnonymous,
					providerData: providerData?.map((p: typeof providerData[0]) => ({
						providerId: p.providerId,
						uid: p.uid,
						displayName: p.displayName,
						email: p.email,
						phoneNumber: p.phoneNumber,
						photoURL: p.photoURL
					})),
					displayName: displayName ?? null,
					photoURL: photoURL ?? null
				};
				dispatch(setPaywall('user', safeUser));
			}
			dispatch(setPaywall('authChecked', true));
		});
		return () => unsubscribe();
	}, []);

	return user;
}
