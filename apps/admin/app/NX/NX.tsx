"use client";
import React from 'react';
import { I_NX, T_Theme } from './types';
import { DesignSystem, Feedback, setDesignSystem, useDesignSystem } from './DesignSystem';
import { useDispatch } from './Uberedux';

const NX: React.FC<I_NX> = ({
    children,
    config,
}) => {
    const dispatch = useDispatch();
    const designSystem = useDesignSystem();
    const defaultTheme = config?.cartridges?.designSystem?.defaultTheme;
    const themeSwitching = config?.cartridges?.designSystem?.themeSwitching;
    const themeMode = designSystem?.themeMode || defaultTheme;

    React.useEffect(() => {
        if (!designSystem?.themeMode && defaultTheme) {
            dispatch(setDesignSystem("themeMode", defaultTheme));
            dispatch(setDesignSystem("themeSwitching", themeSwitching));
        }
    }, [dispatch, designSystem?.themeMode, defaultTheme, themeSwitching]);

    let theme = config?.cartridges?.designSystem?.themes?.[themeMode];
    if (theme) {
        const mode: 'light' | 'dark' = themeMode === 'dark' ? 'dark' : 'light';
        theme = { ...theme, mode };
    }

    return (
        <DesignSystem theme={theme as T_Theme} config={config}>
            <Feedback />
            {children}
        </DesignSystem>
    );
};

export default NX;
