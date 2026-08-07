"use client";

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { CleverTextAS } from './';

export interface I_CleverText {
    options: {
        id: string | undefined;
        markdown?: string;
        onFinish?: () => void;
    }
}

const SAFE_URL_PATTERN = /^(https?:|mailto:|tel:|\/|#)/i;

function sanitizeMarkdownUrl(url?: string) {
    if (!url) {
        return '';
    }

    const trimmedUrl = url.trim();
    return SAFE_URL_PATTERN.test(trimmedUrl) ? trimmedUrl : '';
}

export default function CleverText({ options }: I_CleverText) {

    const ActionScript = React.useRef<CleverTextAS | null>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        ActionScript.current = new CleverTextAS(clipRef);
        ActionScript.current.init();
        return () => {
            if (ActionScript.current) {
                ActionScript.current.destroy();
            }
        }
    }, []);

    const markdownText = options.markdown ?? '';
    const onFinish = options.onFinish;

    // Typewriter effect for real-time text generation
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
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
                if (typeof onFinish === 'function') {
                    onFinish();
                }
            }
        }

        timeout = setTimeout(typeNext, 0);
        return () => clearTimeout(timeout);
    }, [markdownText, onFinish]);

    return (
        <Box
            id={options.id}
            ref={clipRef}
            sx={{
                wordBreak: 'break-word',
            }}
        >
            <ReactMarkdown
                urlTransform={(url) => sanitizeMarkdownUrl(url)}
                components={{
                    a: ({ href, children, ...props }) => {
                        const safeHref = sanitizeMarkdownUrl(href);
                        const isExternal = /^https?:\/\//i.test(safeHref);

                        return (
                            <a
                                {...props}
                                href={safeHref || undefined}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                            >
                                {children}
                            </a>
                        );
                    },
                    img: () => null,
                }}
            >
                {displayed}
            </ReactMarkdown>
        </Box>
    );
}
