"use client";
import React from 'react';
import { I_NX } from './types';
import { Box } from '@mui/material';
import { DesignSystem, Feedback } from './DesignSystem';
import { useDispatch } from './Uberedux';
import { setFlash } from './Flash';

const NX: React.FC<I_NX> = ({
    children,
    config,
    frontmatter,
}) => {

    const themeMode = config?.cartridges?.designSystem?.defaultTheme || 'light';
    const theme = config?.cartridges?.designSystem?.themes?.[themeMode];
    const dispatch = useDispatch();


    React.useEffect(() => {
        if (frontmatter && frontmatter.flash) {
            dispatch(setFlash("sceneOpen", true));
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
    return (
        <DesignSystem theme={theme}>
            <Feedback />
            {children}
        </DesignSystem>
    );
};

export default NX;
