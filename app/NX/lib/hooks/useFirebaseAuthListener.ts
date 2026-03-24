"use client";
import { useEffect } from 'react';
import { getFirebaseAuth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useDispatch } from '../../Uberedux';
import { setPaywall } from '../../Paywall';

/**
 * useFirebaseAuthListener
 * Sets up a global Firebase auth state listener and dispatches to Uberedux/setPaywall.
 *
 * @param onUserChange Optional callback for user state changes
 * @param onAuthChecked Optional callback when auth check completes
 */

export function useFirebaseAuthListener(
  onUserChange?: (user: User | null) => void,
  onAuthChecked?: () => void
) {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      //console.log('Firebase auth state changed:', firebaseUser);
      let safeUser = null;
      if (firebaseUser) {
        const { uid, email, emailVerified, isAnonymous, providerData, displayName, photoURL } = firebaseUser;
        safeUser = {
          uid,
          email,
          emailVerified,
          isAnonymous,
          providerData: providerData?.map((p) => ({
            providerId: p.providerId,
            uid: p.uid,
            displayName: p.displayName,
            email: p.email,
            phoneNumber: p.phoneNumber,
            photoURL: p.photoURL,
          })),
          displayName: displayName ?? null,
          photoURL: photoURL ?? null,
        };
      }
      dispatch(setPaywall('user', safeUser));
      dispatch(setPaywall('authChecked', true));
      dispatch(setPaywall('uid', safeUser?.uid ?? null));
      if (onUserChange) onUserChange(firebaseUser);
      if (onAuthChecked) onAuthChecked();
    });
    return () => unsubscribe();
  }, [dispatch, onUserChange, onAuthChecked]);
}
