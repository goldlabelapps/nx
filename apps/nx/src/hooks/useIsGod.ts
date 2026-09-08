"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseClientAuth } from "@/lib/firebase/client";
import { isGod } from "@/lib/auth/godAuth";

export interface UseIsGodResult {
  /** True if the current logged-in user's UID matches NEXT_PUBLIC_GOD */
  isGod: boolean;
  /** True while initial auth state is loading */
  isLoading: boolean;
  /** The Firebase User object if authenticated, or null */
  user: User | null;
  /** The user's UID if authenticated, or null */
  uid: string | null;
}

/**
 * Custom React hook to check whether the currently authenticated client user is the superuser (God user).
 */
export function useIsGod(): UseIsGodResult {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const auth = getFirebaseClientAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch {
      // If Firebase client initialization is unavailable or missing env vars
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, []);

  const uid = user?.uid ?? null;

  return {
    isGod: isGod(uid),
    isLoading,
    user,
    uid,
  };
}

export const useGod = useIsGod;
export type UseGodResult = UseIsGodResult;

