"use client";
import React from 'react';
import { I_NX, T_Theme } from './types';
import { Box } from '@mui/material';
import { DesignSystem, Feedback } from './DesignSystem';
import { useDispatch } from './Uberedux';
import { setDesignSystem, useDesignSystem } from './DesignSystem';
import { Async } from './Async';
import { EchoPay } from '../../public/echopay/flash';

const NX: React.FC<I_NX> = ({
    children,
    config,
    flash,
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

    if (!theme) {
        return (
            <Box sx={{ border: '2px solid red', m: 1, p: 2, borderRadius: '12px', background: '#fff0f0' }}>
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    Error: Invalid or missing config.json
                </p>
                <pre style={{ padding: '1em', borderRadius: '8px' }}>
                    {JSON.stringify(config, null, 2)}
                </pre>
                {children}
            </Box>
        );
    }

    let flashContent = children;
    if (flash === 'EchoPay') {
        flashContent = <EchoPay />;
    }

    return (
        <DesignSystem theme={theme as T_Theme} config={config}>
            <Feedback />
            {children}
        </DesignSystem>
    );
};

export default NX;

// <Async />