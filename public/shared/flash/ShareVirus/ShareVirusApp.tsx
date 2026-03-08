"use client";
import React from 'react';
import {
    Dialog,
    Box,
    IconButton,
} from '@mui/material';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { Icon } from '../../../../app/NX/DesignSystem';
import { ShareVirus } from './';

export const ShareVirusApp: React.FC<any> = ({ options }) => {

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
                    <ShareVirus />
                </Box>
            </Box>
        </Dialog>
    );
};

export default ShareVirusApp;
