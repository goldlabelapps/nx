'use client';
import * as React from 'react';
import type { FC } from 'react';
import {
    Box,
    CardMedia,
} from '@mui/material';


interface I_Thumbnail {
    src: string;
    alt?: string;
    size?: number;
}

const Thumbnail: FC<I_Thumbnail> = ({ src, alt, size = 75 }) => {
    return (
        <Box sx={{ }}>
            <Box sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                width: size,
                height: size,
            }}>
                <CardMedia
                    component="img"
                    image={src}
                    alt={alt || ''}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </Box>
        </Box>
    );
};

export default Thumbnail;

