import React from "react";
import Image from "next/image";
import { Skeleton, Box } from '@mui/material';
import type { I_Ad } from '../../types';

export const Ad: React.FC<I_Ad> = ({
    frontmatter,
    config,
}) => {

    return <>
        <Box
            sx={{
                width: '100%',
                height: 315,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                borderRadius: '1rem',
                overflow: 'hidden',
            }}
        >
            Advert
        </Box>
    </>;

};