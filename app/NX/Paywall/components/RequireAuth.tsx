import React, { useState } from 'react';
import type { T_Config } from "../../types";
import SignIn from './SignIn';
import { firebaseLogin } from '../../Paywall';
import { User } from 'firebase/auth';
import { useFirebaseAuthListener } from '../../lib';
import { Typography, Backdrop, CircularProgress, Box } from "@mui/material";
import { useDispatch } from '../../Uberedux';
import { setPaywall } from '../../Paywall';

export default function RequireAuth({ children, config }: { children: React.ReactNode; config: T_Config }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await firebaseLogin(email, password, dispatch);
            setUser(user);
        } catch (e) {
            // dispatch(setPaywall("user", null));
        } finally {
            setLoading(false);
        }
    };

    useFirebaseAuthListener((firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
    });

    if (loading) return (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress color="inherit" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Checking credentials...
                </Typography>
            </Box>
        </Backdrop>
    );
    if (!user) return <SignIn config={config} onSignIn={handleSignIn} />;
    return <>{children}</>;
}
