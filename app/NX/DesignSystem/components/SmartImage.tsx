'use client';
import React from "react";
import type { I_SmartImage } from '../../types';
import {
    Box,
} from '@mui/material';

const SmartImage: React.FC<I_SmartImage> = ({ smartImage }) => {
    if (!smartImage) return null;
    return (
        <Box sx={{ border: '1px solid red', padding: '8px' }}>
            <pre>smartImage: {JSON.stringify(smartImage, null, 2)}</pre>
        </Box>
    );
};

export default SmartImage;
