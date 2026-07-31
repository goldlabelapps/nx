"use client";
import React from 'react';
import {
    IconButton,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import {
    setPaywall,
    firebaseLogout,
} from '../../Paywall';

export default function SignOutBtn() {
    const dispatch = useDispatch();

    const handleSignout = async () => {
        await firebaseLogout();
        dispatch(setPaywall('user', null));
        dispatch(setPaywall('account', null));
    }
    
    return (
        <IconButton onClick={handleSignout} color="primary">
            <Icon icon="signout" />
        </IconButton>
    );
}
