"use client";
import { useEffect } from 'react';
import { getFirebaseAuth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useDispatch } from '@nx/uberedux';
import { setPaywall } from '../../Paywall';

/**
 * useFirebaseAuthListener
 * Sets up a global Firebase auth state listener and dispatches to Uberedux
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
    let auth;
    try {
      auth = getFirebaseAuth();
    } catch {
      // Firebase disabled: treat as signed-out instead of crashing the app.
      dispatch(setPaywall('user', null));
      dispatch(setPaywall('authChecked', true));
      dispatch(setPaywall('uid', null));
      if (onAuthChecked) onAuthChecked();
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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
