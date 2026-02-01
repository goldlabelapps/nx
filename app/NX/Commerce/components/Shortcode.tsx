"use client";

import React from "react";
import { T_Ad, T_CommerceShortcode, T_Config } from '../../types';
import { Box, Card, Typography, ButtonBase } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Icon } from '../../DesignSystem';


export type I_Shortcode = {
    slug: string;
    config: T_Config;
};

export const Shortcode: React.FC<I_Shortcode> = ({ slug, config }) => {
    const theme = useTheme();
    const [ad, setAd] = React.useState<T_CommerceShortcode | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!config) {
            setError('No config provided');
            setAd(null);
            return;
        }
        const adsRaw = config.cartridges?.commerce?.ads;
        const ads: T_Ad[] = Array.isArray(adsRaw) ? adsRaw : [];
        const found = ads.find((item) => 'slug' in item && item.slug === slug);
        if (!found) {
            setError(`No product found for slug: "${slug}"`);
            setAd(null);
        } else {
            setAd(found);
            setError(null);
        }
    }, [slug, config]);

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }
    if (!ad) {
        return <Typography variant="body2" color="primary">Loading Shortcode...</Typography>;
    }

    const handleClick = () => {
        if (ad.affiliate) {
            window.open(ad.affiliate, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <ButtonBase
            onClick={handleClick}
            sx={{ width: '100%', mb: 2, borderRadius: 2, textAlign: 'left', display: 'block' }}
        >
            <Card
                variant="outlined"
                sx={{
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                }}
            >
                <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                        {ad.icon && (
                            <Box sx={{ mr: 2 }}>
                                <Icon icon={'shop'} color="primary" />
                            </Box>
                        )}
                        <Typography variant="h6" component="h2" color="primary">
                            {ad.price.toUpperCase()}
                        </Typography>
                    </Box>
                    {ad.description && (
                        <Typography variant="body2" color="text.secondary">
                            {ad.title} {ad.description}
                        </Typography>
                    )}
                </Box>
            </Card>
        </ButtonBase>
    );
};
