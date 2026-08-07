"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    Container, 
    Avatar, 
    Box, 
    IconButton, 
    CardHeader, 
    CardContent, 
    CardActions, 
    Button, 
    TextField, 
    Typography, 
    InputAdornment, 
    CardMedia 
} from '@mui/material';
import { Icon } from '../../DesignSystem';

export interface I_SignIn {
    onSignIn: (email: string, password: string) => void;
    config: any;
    error?: string;
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignIn({ onSignIn, config, error: externalError }: I_SignIn) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const paywallEmail = config.features?.paywall?.email;
    const userMode = config.features?.paywall?.userMode;
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
            if (!isValidEmail(email) || !password) {
                setError('Please enter a valid email and password.');
                return;
            }
            setError('');
            onSignIn(email, password);
        }
    };
    const themeMode: 'light' | 'dark' = config?.features?.designSystem?.defaultTheme || 'light';
    const { siteName, description, images } = config;
    const image = images?.[themeMode] || '';
    const avatar = config?.avatars?.[themeMode] || '';
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
            <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                
                <CardHeader
                    avatar={<IconButton onClick={() => router.push('/') } >
                                    <Avatar src={avatar} alt="Avatar" />
                                </IconButton>}
                    title={siteName}
                    subheader={description}
                />

                    <CardMedia
                        component="img"
                        image={image}
                        alt={siteName || 'image'}
                        hidden={!imgLoaded}
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgLoaded(true)}
                    />
                    
                    {(error || externalError) &&
                        <CardContent>
                            <Typography color="primary">
                                {error || externalError}
                            </Typography>
                        </CardContent>
                    }
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
                        <Box />

                        <Button
                            fullWidth
                            type="submit"
                            endIcon={<Icon icon="signup" />}
                            variant="outlined"
                            disabled={userMode !== 'single' && (!isValidEmail(email) || password.length < 1)}
                        >
                            Register
                        </Button>

                        <Button
                            fullWidth
                            type="submit"
                            endIcon={<Icon icon="signin" />}
                            variant="contained"
                            disabled={userMode !== 'single' && (!isValidEmail(email) || password.length < 1)}
                        >
                            Sign In
                        </Button>
                        <Box />
                    </CardActions>
                    
                        
                    
            </form>
            </Container>
    );
}
