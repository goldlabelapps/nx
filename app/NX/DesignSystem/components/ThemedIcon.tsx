'use client';
import React from "react";
import {
    Avatar,
} from '@mui/material';
import { useDesignSystem } from '../../DesignSystem';

interface ThemedIconProps {
    config?: any;
}

const ThemedIcon: React.FC<ThemedIconProps> = ({ config }) => {

    // Avoid hydration mismatch: render avatar only on client
    const [mounted, setMounted] = React.useState(false);
    const [avatarSrc, setAvatarSrc] = React.useState('');
    const designSystem = useDesignSystem();
    React.useEffect(() => {
        setMounted(true);
        // Use themeMode from designSystem if available, else config
        const themeMode = (designSystem?.themeMode !== undefined && designSystem?.themeMode !== null)
            ? designSystem.themeMode
            : config?.cartridges?.designSystem?.themeMode || 'light';
        const src = config?.icons?.[themeMode]?.icon || '';
        setAvatarSrc(src);
    }, [designSystem?.themeMode, config]);

    if (!mounted) return null;

    return (
            <Avatar
                src={avatarSrc}
            />
    );
};

export default ThemedIcon;