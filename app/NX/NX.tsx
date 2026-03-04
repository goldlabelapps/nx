"use client";
import React from 'react';
import { I_NX, T_Theme } from './types';
import { Box } from '@mui/material';
import { DesignSystem, Feedback } from './DesignSystem';
import { useDispatch } from './Uberedux';
import { setFlash } from './Flash';
import { EchoPay } from '../../public/echopay/flash';

const NX: React.FC<I_NX> = ({
    children,
    config,
    frontmatter,
    flash,
}) => {

    const themeMode: 'light' | 'dark' = (config?.cartridges?.designSystem?.defaultTheme === 'dark') ? 'dark' : 'light';
    let theme = config?.cartridges?.designSystem?.themes?.[themeMode];
    if (theme) {
        const mode: 'light' | 'dark' = themeMode === 'dark' ? 'dark' : 'light';
        theme = { ...theme, mode };
    }
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (frontmatter && frontmatter.flash) {
            dispatch(setFlash("scene", frontmatter.flash));
        } else {
            dispatch(setFlash("scene", null));
        }
    }, [dispatch, frontmatter]);

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
        <DesignSystem theme={theme as T_Theme}>
            <Feedback />
            {flashContent}
        </DesignSystem>
    );
};

export default NX;
