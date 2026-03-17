"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Avatar, Box, IconButton, CardHeader, CardContent, CardActions, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { DesignSystem, Icon } from '../../DesignSystem';
import Image from 'next/image';

export interface I_SignIn {
    onSignIn: (email: string, password: string) => void;
    config: any;
    error?: string;
}

export default function SignIn({ onSignIn, config, error: externalError }: I_SignIn) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const paywallEmail = config.cartridges?.paywall?.email;
    const userMode = config.cartridges?.paywall?.userMode;
    React.useEffect(() => {
        if (userMode === 'single' && paywallEmail) {
            setEmail(paywallEmail);
        }
    }, [userMode, paywallEmail]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userMode === 'single') {
            if (!paywallEmail || !password) {
                setError('Please enter your password.');
                return;
            }
            setError('');
            onSignIn(paywallEmail, password);
        } else {
            if (!email || !password) {
                setError('Please enter both email and password.');
                return;
            }
            setError('');
            onSignIn(email, password);
        }
    };
    const themeMode: 'light' | 'dark' = config?.cartridges?.designSystem?.defaultTheme || 'light';
    let theme = config?.cartridges?.designSystem?.themes?.[themeMode];
    if (theme) {
        theme = { ...theme, mode: themeMode };
    }
    const { siteName, description, images } = config;
    const image = images?.[themeMode] || '';

    const avatar = config?.avatars?.[themeMode] || '';

    return (
        <DesignSystem theme={theme}>
            <Container maxWidth="xs" sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
                    <CardHeader 
                    avatar={<IconButton onClick={() => router.push('/')} >
                                    <Avatar src={avatar} alt="Avatar" />
                                </IconButton>}
                        title={siteName}
                        subheader={description}
                    />
                    <CardContent>
                        {userMode !== 'single' && (
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                        )}
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
                    </CardContent>
                    <CardActions>
                        <Box sx={{flexGrow:1}}/>
                        <Button
                            fullWidth
                            type="submit"
                            endIcon={<Icon icon="signin" />}
                            variant="contained"
                            sx={{ mx: 1 }}
                        >
                            Sign In
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                    </CardActions>
                    <CardContent>
                        {(error || externalError) && 
                        <Typography sx={{ mt: 2 }} color="primary">
                            {error || externalError}
                        </Typography>}
                    </CardContent>
            </form>
            </Container>
        </DesignSystem>
    );
}
