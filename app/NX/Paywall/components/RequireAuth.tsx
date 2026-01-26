
import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import { firebaseLogin } from '../actions/firebaseLogin';
import { getFirebaseAuth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Typography } from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { usePaywall, setPaywall } from '../../Paywall';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await firebaseLogin(email, password);
            setUser(user);
        } catch (e) {
            // dispatch(setPaywall("user", null));
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const auth = getFirebaseAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            let safeUser = null;
            if (firebaseUser) {
                const { uid, email, emailVerified, isAnonymous, providerData, displayName, photoURL } = firebaseUser;
                safeUser = {
                    uid,
                    email,
                    emailVerified,
                    isAnonymous,
                    providerData: providerData?.map(p => ({
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
            }
            dispatch(setPaywall("firebaseUser", safeUser));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return <Typography>Authing...</Typography>;
    if (!user) return <SignIn onSignIn={handleSignIn} />;
    return <>{children}</>;
}
