"use client";
import React from 'react';
import {
    useTheme,
    Dialog,
    Box,
    IconButton,
} from '@mui/material';
import { useFlash, setFlash } from '../../../app/NX/Flash';
import { useDispatch } from '../../../app/NX/Uberedux';
import { Icon } from '../../../app/NX/DesignSystem';
import { EchoPay } from './';

export interface I_EchoPayApp {
    slug?: string;
};

export const EchoPayApp: React.FC<I_EchoPayApp> = () => {

    const theme = useTheme();
    const flash = useFlash();
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setFlash('sceneOpen', false));
    };

    return (
        <Dialog
            fullWidth
            fullScreen
            open={!!flash?.sceneOpen}
            onClose={handleClose}
            maxWidth="sm">
            <Box sx={{
                position: 'relative',
                background: theme.palette.background.default,
            }}>
                <IconButton
                    onClick={handleClose}
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 10
                    }}
                >
                    <Icon icon="close" />
                </IconButton>
                <Box
                    id="app"
                    sx={{
                        height: '100vh',
                        // minHeight: 500,
                        boxSizing: 'border-box'
                    }}
                >
                    <EchoPay />
                </Box>
            </Box>
        </Dialog>
    );
};

export default EchoPayApp;
