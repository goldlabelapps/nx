import React from "react";
import Image from "next/image";
import { Skeleton, Box } from '@mui/material';
import type { I_FeaturedImage } from '../../types';

export const FeaturedImage: React.FC<I_FeaturedImage> = ({
    frontmatter,
    config,
}) => {

    const fallbackImage = config?.image || '/shared/wombat.gif';
    const imageSrc = fallbackImage;

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
            <Image
                src={imageSrc}
                alt={frontmatter?.title || 'Featured image'}
                width={1200}
                height={315}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                }}
                priority
            />
        </Box>
    </>;

};