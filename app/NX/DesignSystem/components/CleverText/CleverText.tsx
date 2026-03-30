"use client";

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { CleverTextAS } from './';
import { setFlash, useFlash } from '../../../../NX/Flash';
import { useDispatch } from '../../../../NX/Uberedux';

export interface I_CleverText {
    options: {
        id: string | undefined;
        markdown: string;
        onFinish?: () => void;
    }
}

export default function CleverText({ options }: I_CleverText) {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const flash = useFlash();

    const thisStep = flash.thisStep || {};
    const dispatch = useDispatch();

    React.useEffect(() => {
        ActionScript.current = new CleverTextAS(clipRef);
        ActionScript.current.init();
        return () => {
            if (ActionScript.current) {
                ActionScript.current.destroy();
            }
        }
    }, [dispatch]);

    const markdownText = options.markdown;

    // Typewriter effect for real-time text generation
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        setDisplayed('');
        let i = 0;
        let timeout: NodeJS.Timeout;

        function typeNext() {
            setDisplayed(markdownText.slice(0, i + 1));
            i++;
            if (i < markdownText.length) {
                // Add random delay and occasional longer pause
                let delay = (10 + Math.random() * 30) * 0.85;
                // Slightly longer pause after punctuation or every 20-40 chars
                if (/[.,!?]/.test(markdownText[i - 1]) && Math.random() < 0.5) {
                    delay += (120 + Math.random() * 100) * 0.85;
                } else if (i % (20 + Math.floor(Math.random() * 20)) === 0) {
                    delay += (80 + Math.random() * 120) * 0.85;
                }
                timeout = setTimeout(typeNext, delay);
            } else {
                // Animation finished, call onFinish if provided
                if (typeof options.onFinish === 'function') {
                    options.onFinish();
                }
            }
        }
        typeNext();
        return () => clearTimeout(timeout);
    }, [markdownText]);

    return (
        <Box
            id={options.id}
            ref={clipRef}
            sx={{
                wordBreak: 'break-word',
            }}
        >
            {/* <pre>thisStep: {JSON.stringify(thisStep, null, 2)}</pre> */}
            <ReactMarkdown>{displayed}</ReactMarkdown>
        </Box>
    );
}
