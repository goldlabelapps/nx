"use client";

import React from "react";
import type { T_Ad } from '../../types';
import { useRouter } from 'next/navigation';
import {
    useTheme,
    lighten,
    Card,
    CardHeader,
    ButtonBase,
    Typography,
} from '@mui/material';
import { Icon } from '../../DesignSystem'

export const Send: React.FC<{ ad: T_Ad; target?: string }> = ({ ad, target }) => {
    const { type, description, title, icon } = ad;
    const router = useRouter();
    const theme = useTheme();

    const handleClick = () => {
        if (type === 'link' && 'url' in ad && ad.url) {
            const openTarget = target || ad.target || (ad.url.startsWith('/') ? '_self' : '_blank');
            const openFeatures = openTarget === '_blank' ? 'noopener,noreferrer' : undefined;
            window.open(ad.url, openTarget, openFeatures);
        } else if (type === 'route' && 'path' in ad && ad.path) {
            router.push(ad.path);
        } else {
            console.log("handleClick for ad", ad);
        }
    };

    return (
        <ButtonBase
            onClick={handleClick}
            sx={{ width: '100%', mb: 1, borderRadius: 2, textAlign: 'left' }}
        >
            <Card
                variant="outlined"
                sx={{
                    width: '100%',
                    borderRadius: 2,
                    bgcolor: lighten(theme.palette.background.paper, 0.05),
                    border: '1px solid ' + lighten(theme.palette.background.paper, 0.1),
                }}
            >
                <CardHeader
                    avatar={icon ? <Icon icon={icon as any} /> : undefined}
                    title={<Typography>{title}</Typography>}
                    subheader={description}
                    sx={{ alignItems: 'flex-start' }}
                />
            </Card>
        </ButtonBase>
    );
};
