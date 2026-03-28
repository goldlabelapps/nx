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

import { NXMC } from './NXMC';

export interface I_Scene {
    options?: any;
}

export const NXMCApp: React.FC<I_Scene> = ({ options }) => {

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
                    <NXMC />
                </Box>
            </Box>
        </Dialog>
    );
};

export default NXMCApp;
