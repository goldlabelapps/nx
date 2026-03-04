"use client";
import React from 'react';
import type { I_Scene } from '../../types';
import {
    Dialog,
    Box,
    IconButton,
} from '@mui/material';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { Icon } from '../../../../app/NX/DesignSystem';
import { NotFound } from './';

export const NotFoundApp: React.FC<I_Scene> = ({ options }) => {

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
            <Box sx={{ position: 'relative' }}>
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
                        height: '85vh',
                        minHeight: 500,
                        boxSizing: 'border-box'
                    }}
                >
                    <NotFound />
                </Box>
            </Box>
        </Dialog>
    );
};

export default NotFoundApp;
