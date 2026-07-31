"use client";
import React, { useState } from 'react';
import { CardActions, Button, TextField } from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { setPaywall } from '../../Paywall';

export default function Register() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSignin = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        dispatch(setPaywall('mode', 'signin'));
    };

    const handleSignup = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        
    };
    
    return (
        <>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <CardActions>
            <Button
                type="submit"
                fullWidth
                endIcon={<Icon icon="signin" />}
                variant="text"
                onClick={handleSignin}
            >
                Sign In
            </Button>
            <Button
                fullWidth
                startIcon={<Icon icon="signup" />}
                variant="outlined"
                onClick={handleSignup}
                disabled
            >
                Register
            </Button>
            </CardActions>
        </>            
    );
}
