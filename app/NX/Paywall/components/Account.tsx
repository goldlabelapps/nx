"use client";
import React from 'react';
import { 
    Box,
    CardHeader,
    CardContent,
    Button,
 } from '@mui/material';
import { 
    useUID,
    useIsAuthed, 
    SimpleSignIn, 
    firebaseLogin, 
    usePaywall,
    firebaseLogout,
    setPaywall,
 } from '../../Paywall';
import { Icon, setFeedback } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface I_Account {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Account({ onClick }: I_Account) {
    const isAuthed = useIsAuthed();
    const paywall = usePaywall();
    const uid = useUID();
    const dispatch = useDispatch();

    // Wait for authChecked before rendering
    if (!paywall?.authChecked) return null;

    const handleSignOut = async () => {
        try {
            const user = await firebaseLogout();
            dispatch(setFeedback({
                severity: 'success',
                title: 'Signed out successfully',
            }))
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            dispatch(setPaywall('error', errorMsg));
        }
    }

    const handleSignin = async (email: string, password: string) => {
        try {
            const user = await firebaseLogin(email, password, dispatch);
            return user;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            dispatch(setPaywall('error', errorMsg));
        }
    }

    if (isAuthed){
        return <>
            <pre>uid: {JSON.stringify(uid, null, 2)}</pre>
            <Button
                endIcon={<Icon icon="signout" color="primary" />}
                variant='outlined'
                onClick={handleSignOut}>
                Sign Out
            </Button>
            
        </>
    }
    
    return (<Box maxWidth={400}>
                {isAuthed && <>
                    <CardHeader
                        avatar={<Icon icon="async" color="primary" />}
                        title={isAuthed ? " (authed)" : " (not authed)"}
                    />
                </>}
                <CardContent>
                    {!isAuthed && <>
                        <SimpleSignIn onSignIn={handleSignin}/>
                    </>}
                    {/* <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre> */}
                </CardContent>
            </Box>);
}
