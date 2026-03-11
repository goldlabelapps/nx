'use client';
import * as React from 'react';
import {
    TextField,
} from '@mui/material';

export default function InputString({
    onChange,
    label,
    description,
    field,
    type = 'string',
    required = true,
    autoFocus,
    value,
    disabled = false,
}: {
    onChange?: (newValue: string) => void;
    label: string;
    description?: string;
    field?: any;
    type?: 'string' | 'email' | 'image' | 'url';
    required?: boolean;
    autoFocus?: boolean;
    value?: string;
    disabled?: boolean;
}) {

    const [inputValue, setInputValue] = React.useState(value || '');
    const [touched, setTouched] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        setTouched(true);
        if (onChange) onChange(val);
    };

    let helper = description || (field && field.description ? field.description : undefined);
    if (touched) {
            if (type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(inputValue)) {
                    helper = 'Valid email required';
                } else {
                    helper = 'Valid email!';
                }
            } else {
                if (inputValue.length < 1) {
                    helper = 'More than 1 char required';
                } else {
                    helper = 'Looks good!';
                }
            }
    }

    return (
        <>
            <TextField
                fullWidth
                label={label}
                variant="standard"
                value={inputValue}
                onChange={handleChange}
                margin="normal"
                required={required}
                helperText={helper}
                autoFocus={autoFocus}
                disabled={disabled}
            />
        </>
    );
}

/*
 <pre>field: {JSON.stringify(field, null, 2)}</pre>
*/