"use client";
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { 
    Box,
    Button,
    Collapse,
} from '@mui/material';
import { SurfaceAS } from './';
import { useDispatch } from '../../../../NX/Uberedux';
import { Icon } from '../../../DesignSystem';

export interface I_Surface {
    options: {
        id: string | undefined;
        markdown: string;
        icon: string;
        iconAlign?: 'left' | 'right';
        label: string;
        onFinish?: () => void;
        onClick?: () => void;
    }
};

const erms: string[] = [
    "Loading",
    "Evaluating",
    "Preparing",
    "Analysing",
    "Reading",
    "Preparing",
    "Processing"
];

export default function Surface({ options }: I_Surface) {

    const dispatch = useDispatch();
    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const [done, setDone] = React.useState(false);
    const [displayed, setDisplayed] = useState('');
    const [showMarkdown, setShowMarkdown] = useState(false);
    const markdownText = options.markdown;
    const { onClick, label } = options;
    
    React.useEffect(() => {
        ActionScript.current = new SurfaceAS(clipRef);
        ActionScript.current.init();
        return () => {
            if (ActionScript.current) {
                ActionScript.current.destroy();
            }
        }
    }, [dispatch]);

    React.useEffect(() => {
        // Show random erms value first, using typewriter effect
        const randomErm = erms[Math.floor(Math.random() * erms.length)];
        setDisplayed('');
        setShowMarkdown(false);
        let i = 0;
        let timeout: NodeJS.Timeout;

        function typeErm() {
            setDisplayed(randomErm.slice(0, i + 1));
            i++;
            if (i < randomErm.length) {
                let delay = (10 + Math.random() * 30) * 0.85;
                if (/[.,!?]/.test(randomErm[i - 1]) && Math.random() < 0.5) {
                    delay += (120 + Math.random() * 100) * 0.85;
                } else if (i % (20 + Math.floor(Math.random() * 20)) === 0) {
                    delay += (80 + Math.random() * 120) * 0.85;
                }
                timeout = setTimeout(typeErm, delay);
            } else {
                // After erms finishes, show markdown
                setTimeout(() => {
                    setDisplayed('');
                    setShowMarkdown(true);
                }, 600);
            }
        }
        typeErm();
        return () => clearTimeout(timeout);
    }, [markdownText]);

    React.useEffect(() => {
        if (!showMarkdown) return;
        setDisplayed('');
        let i = 0;
        let timeout: NodeJS.Timeout;

        function typeNext() {
            setDisplayed(markdownText.slice(0, i + 1));
            i++;
            if (i < markdownText.length) {
                let delay = (10 + Math.random() * 30) * 0.85;
                if (/[.,!?]/.test(markdownText[i - 1]) && Math.random() < 0.5) {
                    delay += (120 + Math.random() * 100) * 0.85;
                } else if (i % (20 + Math.floor(Math.random() * 20)) === 0) {
                    delay += (80 + Math.random() * 120) * 0.85;
                }
                timeout = setTimeout(typeNext, delay);
            } else {
                if (typeof options.onFinish === 'function') {
                    options.onFinish();
                    setDone(true);
                }
            }
        }
        typeNext();
        return () => clearTimeout(timeout);
    }, [showMarkdown, markdownText]);

    return (
        <Box id={options.id} ref={clipRef}>
            <ReactMarkdown>{displayed}</ReactMarkdown>
            <Collapse in={done}>
                <Button 
                    fullWidth={false}
                    variant="outlined"
                    color='primary'
                    onClick={onClick}
                    startIcon={options.iconAlign !== 'right' ? <Icon icon={options.icon as any} /> : undefined}
                    endIcon={options.iconAlign === 'right' ? <Icon icon={options.icon as any} /> : undefined}
                >
                    {label}
                </Button>
            </Collapse>
        </Box>
    );
}

