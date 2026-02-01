'use client';
import React from "react";
import type { I_SmartImage } from '../../types';
import {
    Box,
    Typography,
} from '@mui/material';
import Image from 'next/image';

const SmartImage: React.FC<I_SmartImage> = ({ smartImage }) => {
    if (!smartImage) return null;
    // Open Graph ratio: 1200x630px (width:height = 1.9048)
    const aspectRatio = 1200 / 630;
    const showCaption = false;
    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: 0,
                    paddingBottom: `${100 / aspectRatio}%`,
                    position: 'relative',
                }}
            >
                <Image
                    src={smartImage.src}
                    alt={smartImage?.meta?.alt || ''}
                    fill
                    style={{
                        objectFit: 'cover',
                        borderRadius: '16px',
                    }}
                    sizes="(max-width: 900px) 100vw, 800px"
                    priority
                />
                {showCaption && (
                    <Box
                        sx={{
                            position: 'absolute',
                            left: 8,
                            bottom: 8,
                            bgcolor: 'primary.main',
                            color: '#fff',

                            px: 2,
                            borderRadius: 4,
                            maxWidth: '80%',
                        }}
                    >
                        <Typography variant="caption" sx={{ color: '#fff' }}>
                            {smartImage?.meta?.alt || ''}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SmartImage;
