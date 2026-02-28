"use client";
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {
    useTheme,
    Box,
    darken,
} from '@mui/material';
import { DumbTextAS } from './';

export interface I_DumbTextOptions {
    id?: string;
    markdown?: string;
}

export interface I_DumbTextProps {
    options?: I_DumbTextOptions;
}

export default function DumbText({ options }: I_DumbTextProps) {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const theme = useTheme();
    React.useEffect(() => {
        ActionScript.current = new DumbTextAS(clipRef);
        ActionScript.current.init();
    }, []);


    const defaultOptions = {
        id: undefined,
        markdown: "Just markdown text. No frills",
    };
    const mergedOptions = { ...defaultOptions, ...options };

    return (
        <Box
            id={mergedOptions.id}
            sx={{
                p: 2,
            }}
        >
            <Box
                ref={clipRef}
                sx={{
                    bgcolor: darken(theme.palette.background.paper, 0.25),
                    borderRadius: 2,
                    px: 2.5,
                    border: `1px solid ${darken(theme.palette.divider, 0.9)}`,
                }}
            >
                <ReactMarkdown>
                    {mergedOptions.markdown}
                </ReactMarkdown>
            </Box>
        </Box>
    );
}
