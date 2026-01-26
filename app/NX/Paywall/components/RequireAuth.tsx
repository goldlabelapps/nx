import React, { useEffect, useState } from 'react';
import type { T_Config } from "../../types";
import SignIn from './SignIn';
import { firebaseLogin } from '../../Paywall';
import { getFirebaseAuth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Typography } from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { setPaywall } from '../../Paywall';

export default function RequireAuth({ children, config }: { children: React.ReactNode; config: T_Config }) {
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

    if (loading) return <Typography variant='caption' color="text.secondary">
        Checking your credentials ...
    </Typography>;
    if (!user) return <SignIn config={config} onSignIn={handleSignIn} />;
    return <>{children}</>;
}
