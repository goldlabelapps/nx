"use client";
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { NumberSliderAS } from './';
import { Box, Slider } from '@mui/material';
import { useFlash } from '../../../../app/NX/Flash';

export type NumberSliderOptions = {
    id?: string;
    flashKey?: string;
    type?: 'percentage' | 'currency';
    label?: string;
    helperText?: string;
    prefix?: string;
    range?: {
        min?: number;
        max?: number;
        step?: number | 'any';
    };
};

export interface I_NumberSlider {
    options?: NumberSliderOptions;
    onChange?: (e: any) => void;
}

export default function NumberSlider({ options, onChange }: I_NumberSlider) {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const flash = useFlash();
    const defaultOptions: NumberSliderOptions = {
        id: `cash-slider-${Math.random().toString(36).substr(2, 9)}`,
        label: "Cash Slider",
        helperText: "Helper text for Cash Slider",
        flashKey: 'cto',
        range: {
            min: 0,
            max: 100,
            step: 1,
        },
    };

    const opts = { ...defaultOptions, ...(options || {}) };
    const flashValue = opts.flashKey ? flash[opts.flashKey] : undefined;

    React.useEffect(() => {
        ActionScript.current = new NumberSliderAS(clipRef);
        ActionScript.current.init();
    }, []);

    return (
        <Box id={opts.id} ref={clipRef}>
            <Slider
                color="primary"
                value={flashValue}
                min={opts.range?.min}
                max={opts.range?.max}
                valueLabelDisplay="off"
                onChange={(_, value) => {
                    if (onChange) {
                        // Mimic a synthetic event for compatibility
                        onChange({ target: { value } });
                    }
                }}
            />
            <ReactMarkdown>
                {`**${opts.prefix ?? ''}** ${(() => {
                    const num = typeof flashValue === 'string' ? Number(flashValue) : flashValue;
                    if (num === undefined || num === null || isNaN(num)) return opts.type === 'currency' ? '£0' : opts.type === 'percentage' ? '0%' : '0';
                    if (opts.type === 'currency') {
                        return num.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
                    } else if (opts.type === 'percentage') {
                        return `${num}%`;
                    } else {
                        return num;
                    }
                })()}`}
            </ReactMarkdown>
        </Box>
    );
}


/* <Typography variant="body1" color='text.secondary'  >
                {opts.label}
            </Typography> */