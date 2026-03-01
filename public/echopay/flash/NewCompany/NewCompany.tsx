"use client";
import type { I_NewCompany } from '../../types'
import * as React from 'react';
import {
    useTheme,
    Box,
    darken,
    lighten,
} from '@mui/material';
import { DumbText } from '../';
import { NewCompanyAS } from './';

export default function NewCompany({ options }: I_NewCompany) {

    const defaultOptions = {
        id: undefined,
        markdown: "New company default text",
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const theme = useTheme();

    React.useEffect(() => {
        ActionScript.current = new NewCompanyAS(clipRef);
        ActionScript.current.init();
    }, []);

    return (
        <Box
            id={mergedOptions.id}
            sx={{
                p: 2,
            }}
        >
            <Box>
                <DumbText options={{
                    id: 'dumb1',
                    markdown: mergedOptions.markdown,
                }} />
            </Box>

            <Box
                ref={clipRef}
                sx={{
                    bgcolor: darken(theme.palette.background.paper, 0.25),
                    borderRadius: 2,
                    px: 2.5,
                    border: `1px solid ${darken(theme.palette.divider, 0.9)}`,
                }}
            >
                This is the new company form.
                it blocks anything else until it's
                filled in validly and submitted.
            </Box>


        </Box>
    );
}
