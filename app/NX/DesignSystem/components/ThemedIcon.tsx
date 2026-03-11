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

    const designSystem = useDesignSystem();
    const [avatarSrc, setAvatarSrc] = React.useState('/shared/svg/blank.svg');

    React.useEffect(() => {
        const themeMode = (designSystem?.themeMode !== undefined && designSystem?.themeMode !== null)
            ? designSystem.themeMode
            : config?.cartridges?.designSystem?.themeMode || 'light';
        const src = config?.icons?.[themeMode]?.icon || '';
        setAvatarSrc(src);
    }, [designSystem?.themeMode, config]);

    return  <Avatar  src={avatarSrc} />;

};

export default ThemedIcon;