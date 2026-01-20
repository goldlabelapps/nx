import React from "react";
import { T_Frontmatter } from '../../types'
import Image from "next/image";

export interface I_FeaturedImage {
    image?: string;
    flickrSlug?: string;
    alt?: string;
    frontmatter?: T_Frontmatter;
}

export const FeaturedImage: React.FC<I_FeaturedImage> = ({ image, flickrSlug, alt, frontmatter }) => {
    // If neither image nor flickrSlug is provided, show error
    if (!image && !flickrSlug) {
        return (
            <div style={{
                background: '#ffeaea',
                color: '#c00',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                border: '1px solid #c00',
                textAlign: 'center',
            }}>
                <strong>Error:</strong> No featured image or Flickr slug provided.
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
            </div>
        );
    }

    // If image is provided, render it
    if (image) {
        return (
            <div className="featured-image" style={{ width: '100%', height: 315, overflow: 'hidden', marginBottom: '1.5rem', borderRadius: '1rem' }}>
                <Image
                    src={image}
                    alt={alt || "Featured Image"}
                    width={1200}
                    height={315}
                    priority
                    style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block', borderRadius: '1rem' }}
                />
            </div>
        );
    }

    // If flickrSlug is provided but no image, show a placeholder or message
    if (flickrSlug) {
        return (
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
        );
    }

    return null;
};