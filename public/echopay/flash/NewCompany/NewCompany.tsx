"use client";
import type { I_NewCompany } from '../../types'
import * as React from 'react';
import {
    useTheme,
    Box,
    darken,
    lighten,
} from '@mui/material';
import { CleverText } from '../';
import { NewCompanyAS } from './';
import { useFlash } from '../../../../app/NX/Flash'

export default function NewCompany({ options }: I_NewCompany) {

    const defaultOptions = {
        id: undefined,
        markdown: "New company default text",
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const flash = useFlash();

    const thisStep = flash.thisStep || {};

    React.useEffect(() => {
        ActionScript.current = new NewCompanyAS(clipRef);
        ActionScript.current.init();
        // console.log('NewCompany thisStep:', thisStep);
        if (thisStep?.num === 1) {
            // Multi-tenant

        }
    }, [thisStep]);

    return (
        <Box
            id={mergedOptions.id}
        >
            <Box
                ref={clipRef}
                sx={{
                    bgcolor: darken(theme.palette.background.paper, 0.25),
                    borderRadius: 2,
                    p: 2,
                }}
            >
                <CleverText options={{
                    markdown: mergedOptions.markdown,
                    onDone: () => {
                        console.log('CleverText done');
                    },
                }} />

            </Box>
        </Box>
    );
}
