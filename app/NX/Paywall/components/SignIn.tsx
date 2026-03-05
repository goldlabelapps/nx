import React, { useState } from 'react';
import { Box, IconButton, CardContent, CardActions, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { DesignSystem, Icon } from '../../DesignSystem';

interface SignInProps {
    onSignIn: (email: string, password: string) => void;
    config: any;
    error?: string;
}

export default function SignIn({ onSignIn, config, error: externalError }: SignInProps) {
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
    const themeMode: 'light' | 'dark' = 'dark';
    let theme = config?.cartridges?.designSystem?.themes?.[themeMode];
    if (theme) {
        theme = { ...theme, mode: themeMode };
    }
    const { title, description, image } = config;
    return (
        <DesignSystem theme={theme}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}>
                    <Box
                        sx={{
                            width: '100%',
                            aspectRatio: '1.91 / 1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={image}
                            alt={`${title} ${description}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: 'inherit',
                            }}
                        />
                    </Box>
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
                                autoFocus
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
                        {(error || externalError) && <Typography color="error">{externalError || error}</Typography>}
                    </CardContent>
                    <CardActions>
                        <Button
                            endIcon={<Icon icon="signin" />}
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mx: 1, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </CardActions>

                </Box>
            </form>
        </DesignSystem>
    );
}
