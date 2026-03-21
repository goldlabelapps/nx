"use client";
import React from 'react';
import { 
    Box,
    CardHeader,
    CardContent,
    Button,
 } from '@mui/material';
import { useIsAuthed, 
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
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            const user = await firebaseLogout();
            dispatch(setFeedback({
                severity: 'success',
                title: 'Signed out successfully',
                description: 'fdasfljf fd',
            }))
        } catch (error) {
            // dispatch(setPaywall({ user: null, authChecked: true }));
            console.log('handleSignin error', error);
        }
    }

    const handleSignin = async (email: string, password: string) => {
        try {
            const user = await firebaseLogin(email, password, dispatch);
            console.log('handleSignin user', user);
            // dispatch(setPaywall({ user, authChecked: true }));
        } catch (error) {
            dispatch(setPaywall('error', error));
            // dispatch(setPaywall({ user: null, authChecked: true }));
            // console.log('handleSignin error', error);
        }
    }

    if (isAuthed){
        return <>
            <Button
                endIcon={<Icon icon="signout" color="primary" />}
                variant='outlined'
                onClick={handleSignOut}>
                Sign Out
            </Button>
            <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre>
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
                    <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre>
                </CardContent>
            </Box>);
}
