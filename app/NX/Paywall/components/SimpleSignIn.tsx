"use client";
import React, { useState } from 'react';
import { IconButton,Button, TextField, Typography, InputAdornment } from '@mui/material';
import { Icon } from '../../DesignSystem';

export interface I_SimpleSignIn {
    onSignIn?: (email: string, password: string) => void;
    [key: string]: any;
}

export default function SimpleSignIn({ onSignIn}: I_SimpleSignIn) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // Simple email validation regex
    function isValidEmail(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const isFormValid = isValidEmail(email) && password.length >= 6;

    const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();
        if (isFormValid && onSignIn) {
            onSignIn(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                variant='outlined'
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword((show) => !show)}
                                edge="end"
                            >
                                <Icon color={"primary"} icon={showPassword ? 'hide' : 'show'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSubmit(e);
                    }
                }}
            />
            <Typography sx={{ my: 1 }} color="primary">
                {error}
            </Typography>
            <Button
                fullWidth
                type="submit"
                endIcon={<Icon icon="signin" />}
                variant="outlined"
                sx={{ mt: 1 }}
                disabled={!isFormValid}
                onClick={handleSubmit}
            >
                Sign In
            </Button>
        </form>
    );
}
