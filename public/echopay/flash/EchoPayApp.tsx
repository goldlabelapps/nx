"use client";
import React from 'react';
import {
    Dialog,
    Box,
    IconButton,
} from '@mui/material';
import { useFlash, setFlash } from '../../../app/NX/Flash';
import { useDispatch } from '../../../app/NX/Uberedux';
import { Icon } from '../../../app/NX/DesignSystem';

export interface I_Scene {
    slug?: string;
}

export const EchoPayApp: React.FC<I_Scene> = ({ slug }) => {

    const flash = useFlash();
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setFlash('sceneOpen', false));
    };

    return (
        <Dialog
            fullWidth
            open={!!flash?.sceneOpen}
            onClose={handleClose}
            maxWidth="sm">
            <Box>
                <Box>
                    <IconButton onClick={handleClose} color="primary">
                        <Icon icon="close" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 1,
                        p: 2,
                        minHeight: 500
                    }}
                >
                    EchoPayApp
                </Box>
            </Box>
        </Dialog>
    );
};

export default EchoPayApp;
