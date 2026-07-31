"use client";
import React, { useState } from 'react';
import { 
    Box,
    IconButton,
    Button, 
    TextField, 
    Typography, 
    InputAdornment,
    Avatar,
    CardHeader
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from '../../Uberedux';
import type { T_Config } from '../../types';
import { login } from '../../Paywall';

export default function SimpleSignIn({ config }: { config?: T_Config }) {
    
    const dispatch = useDispatch();
    const currentThemeMode = useTheme().palette.mode as 'light' | 'dark';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    function isValidEmail(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const isFormValid = isValidEmail(email) && password.length >= 6;

    const handleSubmit = (e?: React.FormEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();
        if (isFormValid) dispatch(login(email, password));
    };

    return (
        <form onSubmit={handleSubmit}>

            {config && (
                <CardHeader
                    sx={{ width: '100%' }}
                    title={<Typography variant="h6" color="text.secondary">
                        {config.siteName}
                    </Typography>}
                    // avatar={
                    //     <Avatar
                    //         src={config.favicon}
                    //         alt={config.siteName} />
                    // }
                />
            )}

            <Box sx={{ mx: 3}}>

                <TextField
                    label="Email"
                    variant='standard'
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant='standard'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
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
                                    <Icon icon={showPassword ? 'hide' : 'show'} />
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
                <Box sx={{my:2}}>
                    <Button
                        type="submit"
                        fullWidth
                        endIcon={<Icon icon="signin" color="primary" />}
                        variant={isFormValid ? "contained" : "text"}
                        sx={{ mt: 2 }}
                        disabled={!isFormValid}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>

            <Typography sx={{ my: 1 }} color="primary">
                {error}
            </Typography>

        </form>
    );
}


