import React from "react";
import Image from "next/image";
import { Skeleton, Box } from '@mui/material';
import type { I_FeaturedImage } from '../../types';

export const FeaturedImage: React.FC<I_FeaturedImage> = ({
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
            <Skeleton
                variant="rectangular"
                width="100%"
                height={315}
                sx={{
                    borderRadius: '1rem',
                    maxWidth: 1200,
                    mx: 'auto',
                }}
            />
        </Box>
        {/* <pre style={{
            background: '#fff0f0',
            color: '#333',
            textAlign: 'left',
            marginTop: '1em',
            padding: '0.5em',
            borderRadius: '0.25em',
            overflowX: 'auto',
        }}>config: {JSON.stringify(config, null, 2)}</pre>
        <pre style={{
            background: '#fff0f0',
            color: '#333',
            textAlign: 'left',
            marginTop: '1em',
            padding: '0.5em',
            borderRadius: '0.25em',
            overflowX: 'auto',
        }}>frontmatter: {JSON.stringify(frontmatter, null, 2)}</pre> */}
    </>;

};