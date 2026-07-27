"use client";
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';

/**
 * FlashBadge — placeholder component proving the @leida/nx-flash package
 * is correctly loaded and working.
 */
export const FlashBadge: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 1,
            }}
        >
            <Chip
                icon={<FlashOnIcon fontSize="small" />}
                label={
                    <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                        @leida/nx-flash loaded
                    </Typography>
                }
                size="small"
                color="primary"
                variant="outlined"
            />
        </Box>
    );
};

export default FlashBadge;
