"use client";
import React from 'react';
import { 
    Box,
    CardHeader,
    CardContent,
    CardActions,
    Button,
 } from '@mui/material';
import { useIsAuthed, SimpleSignIn, firebaseLogin, usePaywall } from '../../Paywall';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface I_Account {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Account({ onClick }: I_Account) {
    
    const isAuthed = useIsAuthed();
    const paywall = usePaywall();

    const handleSignin = async (email: string, password: string) => {
        console.log('handleSignin');
        try {
            const user = await firebaseLogin(email, password);
            console.log('handleSignin user', user);
            // dispatch(setPaywall({ user, authChecked: true }));
        } catch (error) {
            // dispatch(setPaywall({ user: null, authChecked: true }));
            console.log('handleSignin error', error);
        }
    }

    if (isAuthed){
        return <>
        
            <pre>paywall: {JSON.stringify(paywall, null, 2)}</pre>
        </>
    }
    
    return (<Box>
                
                {isAuthed && <>
                    <CardHeader
                        avatar={<Icon icon="async" color="primary" />}
                        title={isAuthed ? " (authed)" : " (not authed)"}
                    />
                </>}

                <CardContent>
                
                {!isAuthed && <>
                    <SimpleSignIn onSignIn={handleSignin}/>
                
                {/* {!isAuthed && <>
                    <Button
                        variant='outlined'
                        onClick={() => { }}>
                        Sign Up
                    </Button>
                </>} */}
                </>}
                </CardContent>
    </Box>);

}
