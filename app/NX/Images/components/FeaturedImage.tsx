import React from "react";
import Image from "next/image";
import { Box } from '@mui/material';
import type { I_FeaturedImage } from '../../types';

export const FeaturedImage: React.FC<I_FeaturedImage> = ({
    frontmatter,
    config,
}) => {

    const cartridges = config?.cartridges;
    const imagesCartridge = cartridges?.images;
    const isFlickrMode = imagesCartridge && imagesCartridge.mode === 'flickr';


    // If flickr in frontmatter and isFlickrMode, try to match slug in imagesCartridge.flickr
    if (frontmatter?.flickr && isFlickrMode) {
        const flickrMatch = imagesCartridge.flickr.find((img) => img.slug === frontmatter.flickr);
        if (flickrMatch) {
            return (
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: 180, sm: 250, md: 315 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: { xs: '0.25rem', md: '1rem' },
                        mb: { xs: '1rem', md: '1.5rem' },
                        borderRadius: '1rem',
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={flickrMatch.src}
                        alt={flickrMatch.title || 'Flickr image'}
                        width={1200}
                        height={315}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            borderRadius: '1rem',
                            display: 'block',
                            maxHeight: '100%',
                        }}
                        priority
                    />
                </Box>
            );
        } else {
            return (
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: 180, sm: 250, md: 315 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: { xs: '0.25rem', md: '1rem' },
                        mb: { xs: '1rem', md: '1.5rem' },
                        borderRadius: '1rem',
                        overflow: 'auto',
                        background: '#fff3cd',
                        color: '#856404',
                        border: '1px solid #ffeeba',
                    }}
                >
                    <pre style={{ width: '100%', maxHeight: 315, overflow: 'auto', fontSize: 14 }}>
                        {`Warning: No Flickr image found for slug "${frontmatter.flickr}"`}
                    </pre>
                </Box>
            );
        }
    }


    // Fallback order: frontmatter.image > config.image > /nx/oj.jpg
    let imageSrc = '/nx/oj.jpg';
    if (config?.image) imageSrc = config.image;
    if (frontmatter?.image) imageSrc = frontmatter.image;

    return (
        <Box
            sx={{
                width: '100%',
                height: { xs: 180, sm: 250, md: 315 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: { xs: '0.25rem', md: '1rem' },
                mb: { xs: '1rem', md: '1.5rem' },
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
                    display: 'block',
                    maxHeight: '100%',
                }}
                priority
            />
        </Box>
    );

};