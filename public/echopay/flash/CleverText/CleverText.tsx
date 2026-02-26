"use client";
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import {
    Box,
} from '@mui/material';

import { CleverTextAS } from './';

export default function CleverText() {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        ActionScript.current = new CleverTextAS(clipRef);
        ActionScript.current.init();
    }, []);

    const name = 'Example Company Ltd';
    const cto = 1000000
    const atv = 500;
    const biz = 75;

    const currentCostPerMonth = 2000;
    const echoPayCostPerMonth = 1500;
    const yearlyProfit = (currentCostPerMonth - echoPayCostPerMonth) * 12;

    const markdownText = `**${name}** has a monthly card turnover of **£${cto}** and an average transaction value of **£${atv}**. The percentage of business cards compared to comsumer ones is **${biz}%**.
    Their card aquisition cost per month is **£${currentCostPerMonth}** but with EchoPay is **£${echoPayCostPerMonth}**. Which over the course a of a year means **£${yearlyProfit}**
`;

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
                let delay = 10 + Math.random() * 30;
                // Slightly longer pause after punctuation or every 20-40 chars
                if (/[.,!?]/.test(markdownText[i - 1]) && Math.random() < 0.5) {
                    delay += 120 + Math.random() * 100;
                } else if (i % (20 + Math.floor(Math.random() * 20)) === 0) {
                    delay += 80 + Math.random() * 120;
                }
                timeout = setTimeout(typeNext, delay);
            }
        }
        typeNext();
        return () => clearTimeout(timeout);
    }, [markdownText]);

    return (
        <Box
            sx={{
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'flex-start',
                gap: 2,
                p: 3,
                bgcolor: '#f7f7f8',
                minHeight: 320,
                width: '100%',
                maxWidth: 480,
            }}
        >
            <Box
                ref={clipRef}
                sx={{
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
                    p: 2.5,
                    color: '#222',
                    border: '1px solid #e5e5e5',
                    wordBreak: 'break-word',
                    minHeight: 40,
                }}
            >
                <ReactMarkdown>{displayed}</ReactMarkdown>

            </Box>
        </Box>
    );
}
