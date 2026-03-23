"use client";
import { useState } from "react";
import { User } from "firebase/auth";
import { useFirebaseAuthListener } from '../../lib/index';

/**
 * useAuthed - React hook to get Firebase auth state
 * Returns: User object if authenticated, null otherwise
 */
export function useAuthed(): User | null {
    const [user, setUser] = useState<User | null>(null);
    useFirebaseAuthListener((firebaseUser) => {
        setUser(firebaseUser ?? null);
    });
    return user;
}
