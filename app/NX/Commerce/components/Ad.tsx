"use client";

import React from "react";
import type { T_Ad } from '../../types';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardHeader,
    ButtonBase,
} from '@mui/material';
import { Icon } from '../../DesignSystem'


export const Ad: React.FC<{ ad: T_Ad }> = ({ ad }) => {
    const { type, description, title, icon } = ad;
    const router = useRouter();

    const handleClick = () => {
        if (type === 'link' && 'url' in ad && ad.url) {
            window.open(ad.url, '_blank', 'noopener,noreferrer');
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
                sx={{ width: '100%', borderRadius: 2 }}
            >
                <CardHeader
                    avatar={icon ? <Icon icon={icon as any} color="primary" /> : undefined}
                    title={title}
                    subheader={description}
                    sx={{ alignItems: 'flex-start' }}
                />
                {/* <pre>ad: {JSON.stringify(ad, null, 2)}</pre> */}
            </Card>
        </ButtonBase>
    );
};
