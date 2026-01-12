import React, { ReactNode } from 'react';
import { T_NX } from './types';
import { Box } from '@mui/material';

const NX: React.FC<T_NX> = ({ children }) => {
    return (
        <Box
            sx={{
                border: '2px solid #333',
                m: 1,
                p: 2,
                borderRadius: '12px',
            }}>
            <p style={{ marginBottom: '1rem' }}>
                NX Wrapper
            </p>
            {children}
        </Box>
    );
};

export default NX;
