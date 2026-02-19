"use client";
import React from 'react';
import {
    TextField,
} from '@mui/material';


interface I_VariableMC {
    value: string | number;
    onChange: (value: string | number) => void;
    label?: string;
    type?: 'string' | 'number';
    // Add more props as needed
}

const VariableMC: React.FC<I_VariableMC> = ({ value, onChange = () => { if (process.env.NODE_ENV !== 'production') { console.warn('VariableMC: onChange prop not provided'); } }, label = '', type = 'string' }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const num = e.target.value === '' ? '' : Number(e.target.value);
            onChange(num);
        } else {
            onChange(e.target.value);
        }
    };

    return (
        <TextField
            sx={{ my: 2.5, mr: 2 }}
            label={label}
            color="secondary"
            value={value}
            onChange={handleChange}
            type={type === 'number' ? 'number' : 'text'}
            fullWidth={type !== 'number'}
            variant={type === 'string' ? 'standard' : 'outlined'}
        />
    );
};

export default VariableMC;
