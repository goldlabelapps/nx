"use client";
import type { I_Chunk } from '../types';
import React from 'react';
import { Avatar, alpha, useTheme, Box, Typography } from '@mui/material';
import { useFlash } from '../../../../Flash';

const Chunk = (chunk: I_Chunk) => {
    const theme = useTheme();
    const flash = useFlash() ?? {};

    if (!chunk) return null;

    const chatbot = flash.chatbot ?? {};

    const {
        prompt,
    } = chunk.chunk;
    // Always use 'row' for flexDirection, or adjust logic as needed
    /// /shared/svg/characters/biker.svg
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    p: 2,
                    background: alpha(theme.palette.primary.main, 0.2),
                    border: '1px solid ' + alpha(theme.palette.divider, 0.2),
                    borderRadius: 3,
                    flexDirection: 'row',
                    width: '80%',
                }}
            >
                <Typography variant='h6' sx={{ mt: 0.25 }}>{prompt}</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
                <Avatar src={chatbot.userIcon} />
            </Box>
        </Box>
    );
};

export default Chunk;


