'use client';
import React from "react";
import {
    IconButton,
    Avatar,
} from '@mui/material';
import { useDesignSystem } from '../../DesignSystem';

interface ThemedIconProps {
    config?: any;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({ config }) => {

    // const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const designSystem = useDesignSystem();
    const themeMode = config?.cartridges?.designSystem?.themeMode || designSystem?.themeMode || 'light';
    const avatarSrc = config?.icons?.[themeMode].icon || '';
    const router = require('next/navigation').useRouter();
    const handleClick = () => {
        router.push('/');
    };

    return (
        <IconButton
            edge="start"
            color="inherit"
            aria-label={'Home'}
            onClick={handleClick}>
            <Avatar
                src={avatarSrc}
            />
        </IconButton>
    );
};

export default ThemedIcon;