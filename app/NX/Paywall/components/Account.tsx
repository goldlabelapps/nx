"use client";
import React from 'react';
import { 
    Box,
    CardHeader,
    CardContent,
} from '@mui/material';
import { 
    useUID,
    useIsAuthed, 
    SimpleSignIn, 
    firebaseLogin, 
    usePaywall,
    setPaywall,
    AccountCard,
    Register,
 } from '../../Paywall';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface I_Account {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Account({ onClick }: I_Account) {
    const isAuthed = useIsAuthed();
    const paywall = usePaywall();
    const uid = useUID();
    const dispatch = useDispatch();

    if (!paywall?.authChecked) return null;

    const handleSignin = async (email: string, password: string) => {
        try {
            const user = await firebaseLogin(email, password, dispatch);
            return user;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            dispatch(setPaywall('error', errorMsg));
        }
    }

    if (isAuthed) return <AccountCard />;

    // Show Register or SimpleSignIn based on paywall.mode
    let content = null;
    if (paywall?.mode === 'register') {
        content = <Register onSignIn={handleSignin} />;
    } else if (paywall?.mode === 'signin') {
        content = <SimpleSignIn onSignIn={handleSignin} />;
    } else {
        content = <SimpleSignIn onSignIn={handleSignin} />;
    }

    return (
        <Box maxWidth={400}>
            {content}
            {/* <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre> */}
        </Box>
    );
}
