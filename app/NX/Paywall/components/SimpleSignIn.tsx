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

    return <>
            
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
            />
            <Typography sx={{ my: 1 }} color="primary">
                {error}
            </Typography>
            <Button
                fullWidth
                type="submit"
                endIcon={<Icon icon="signin" />}
                variant="outlined"
                sx={{ mx: 0 }}
                onClick={() => onSignIn && onSignIn(email, password)}
            >
                Sign In
            </Button>
        </>
    
}
