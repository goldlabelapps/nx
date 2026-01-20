import React from "react";
import { T_Frontmatter } from '../../types'
import Image from "next/image";
import { Skeleton, Box } from '@mui/material';

import type { T_Config } from '../../types';

export interface I_FeaturedImage {
    frontmatter?: T_Frontmatter;
    config?: T_Config;
}


export const FeaturedImage: React.FC<I_FeaturedImage> = ({
    frontmatter,
    config,
}) => {
    let image = '';
    let flickrSlug = '';
    let alt = '';
    // If neither image nor flickrSlug is provided, show a Skeleton placeholder
    if (!image && !flickrSlug) {
        return (
            <>
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
                        background: '#f5f5f5',
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
                <Box sx={{ mt: 2, mb: 2 }}>
                    {frontmatter && (
                        <pre style={{
                            background: '#fff0f0',
                            color: '#333',
                            textAlign: 'left',
                            marginTop: '1em',
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            overflowX: 'auto',
                        }}>{JSON.stringify(frontmatter, null, 2)}</pre>
                    )}
                    {config && (
                        <pre style={{
                            background: '#f0fff0',
                            color: '#333',
                            textAlign: 'left',
                            marginTop: '1em',
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            overflowX: 'auto',
                        }}>{JSON.stringify(config, null, 2)}</pre>
                    )}
                </Box>
            </>
        );
    }

    // If image is provided, render it centered in a 315px high box
    if (image) {
        return (
            <>
                <Box
                    className="featured-image"
                    sx={{
                        width: '100%',
                        height: 315,
                        overflow: 'hidden',
                        marginBottom: '1.5rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f5f5f5',
                    }}
                >
                    <Image
                        src={image}
                        alt={alt || "Featured Image"}
                        width={1200}
                        height={315}
                        priority
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            display: 'block',
                            borderRadius: '1rem',
                            maxWidth: 1200,
                            margin: '0 auto',
                        }}
                    />
                </Box>
                <Box sx={{ mt: 2, mb: 2 }}>
                    {frontmatter && (
                        <pre style={{
                            background: '#fff0f0',
                            color: '#333',
                            textAlign: 'left',
                            marginTop: '1em',
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            overflowX: 'auto',
                        }}>{JSON.stringify(frontmatter, null, 2)}</pre>
                    )}
                    {config && (
                        <pre style={{
                            background: '#f0fff0',
                            color: '#333',
                            textAlign: 'left',
                            marginTop: '1em',
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            overflowX: 'auto',
                        }}>{JSON.stringify(config, null, 2)}</pre>
                    )}
                </Box>
            </>
        );
    }

    // If flickrSlug is provided but no image, show a placeholder or message
    if (flickrSlug) {
        return (
            <>
                <div style={{
                    background: '#f0f8ff',
                    color: '#0077b6',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem',
                    border: '1px solid #0077b6',
                    textAlign: 'center',
                }}>
                    <strong>Flickr Slug:</strong> {flickrSlug}
                    {/* You can add logic here to fetch and display a Flickr image if desired */}
                </div>
                <Box sx={{ mt: 2, mb: 2 }}>
                    {frontmatter && (
                        <pre style={{
                            background: '#fff0f0',
                            color: '#333',
                            textAlign: 'left',
                            marginTop: '1em',
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            overflowX: 'auto',
                        }}>{JSON.stringify(frontmatter, null, 2)}</pre>
                    )}
                    {config && (
                        <pre style={{
                            background: '#f0fff0',
                            color: '#333',
                            textAlign: 'left',
                            marginTop: '1em',
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            overflowX: 'auto',
                        }}>{JSON.stringify(config, null, 2)}</pre>
                    )}
                </Box>
            </>
        );
    }

    return null;
};