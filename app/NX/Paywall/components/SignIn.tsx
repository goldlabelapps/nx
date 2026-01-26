import React, { useState } from 'react';
import { Box, IconButton, Avatar, Card, CardMedia, CardHeader, CardContent, CardActions, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { DesignSystem, Icon } from '../../DesignSystem';

export default function SignIn({ onSignIn, config }: { onSignIn: (email: string, password: string) => void; config: any }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const paywallEmail = config.cartridges?.paywall?.email;
    const userMode = config.cartridges?.paywall?.userMode;

    // If userMode is 'single', always use paywallEmail
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

    const themeMode = 'light';
    const theme = config?.cartridges?.designSystem?.themes?.[themeMode];
    const { title, icon, description, image } = config;

    return (
        <DesignSystem theme={theme}>
            <form onSubmit={handleSubmit}>
                <Card variant='outlined' sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}>

                    <CardHeader
                        avatar={<IconButton disabled>
                            <Avatar alt={`${title} ${description}`} src={icon} />
                        </IconButton>}
                        title={title}
                        subheader={description}
                    />
                    <Box
                        sx={{
                            width: '100%',
                            aspectRatio: '1.91 / 1', // Open Graph ratio
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            borderRadius: 2,
                            mb: 2,
                            background: theme?.palette?.background?.default || '#f5f5f5',
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
                            variant='filled'
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                            autoFocus={userMode === 'single'}
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
                        {error && <Typography color="error">{error}</Typography>}
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

                </Card>
            </form>
        </DesignSystem>
    );
}
