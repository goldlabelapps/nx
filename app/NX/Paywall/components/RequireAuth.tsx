
import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import { firebaseLogin } from '../actions/firebaseLogin';
import { getFirebaseAuth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Typography } from "@mui/material";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await firebaseLogin(email, password);
            setUser(user);
        } catch (e) {
            alert('Sign in failed');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const auth = getFirebaseAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <Typography>Authing...</Typography>;
    if (!user) return <SignIn onSignIn={handleSignIn} />;
    return <>{children}</>;
}
