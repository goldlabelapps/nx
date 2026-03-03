"use client";
import * as React from 'react';
import { CashSliderAS } from './';
import { Box, Typography, Slider } from '@mui/material';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { useFlash, setFlash } from '../../../../app/NX/Flash';

export type CashSliderOptions = {
    id?: string;
    flashKey?: string;
    label?: string;
    helperText?: string;
    range?: {
        min?: number;
        max?: number;
        step?: number | 'any';
    };
};



interface CashSliderProps {
    options?: CashSliderOptions;
    onChange?: (e: any) => void;
}

export default function CashSlider({ options, onChange }: CashSliderProps) {
    const dispatch = useDispatch();
    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);
    const flash = useFlash();
    const defaultOptions: CashSliderOptions = {
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
        ActionScript.current = new CashSliderAS(clipRef);
        ActionScript.current.init();
    }, [options]);

    return (
        <Box id={opts.id} ref={clipRef}>

            {/* <pre>flash: {JSON.stringify(flash, null, 2)}</pre> */}

            <Typography variant="body1" color='text.secondary'  >
                {opts.label}
            </Typography>

            <Slider
                color="primary"
                sx={{ mt: 1 }}
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

            <Typography variant="h6"  >
                {(() => {
                    const num = typeof flashValue === 'string' ? Number(flashValue) : flashValue;
                    return !isNaN(num) && num !== undefined && num !== null
                        ? num.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 })
                        : '£0';
                })()}
            </Typography>
        </Box>
    );
}
{/* <pre>options: {JSON.stringify(options || defaultOptions, null, 2)}</pre> */ }
