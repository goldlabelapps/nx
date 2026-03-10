'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    IconButton,
    Button,
    TextField,
} from '@mui/material';
import { useDispatch } from '../../../../NX/Uberedux';
import { setNXAdmin, setCRUD, useCRUD } from '../../../NXAdmin'
import { Icon } from '../../../../NX/DesignSystem';

export default function Strings({
    collection,
    label,
    description,
    field,
    type = 'text',
    onChange,
    required = true,
    autoFocus,
    value,
}: {
    collection?: string;
    label: string;
    description?: string;
    field?: any;
    type?: string;
    onChange?: (newValue: string) => void;
    required?: boolean;
    autoFocus?: boolean;
    value?: string;
}) {

    const dispatch = useDispatch();
    const crud = useCRUD();

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
        if (inputValue.length < 5) {
            helper = 'Must be more than 5 chars.';
        } else {
            helper = 'Looks good!';
        }
    }

    return (
        <>
        <TextField
            label={label}
            variant="outlined"
            type={type}
            value={inputValue}
            onChange={handleChange}
            margin="normal"
            required={required}
            helperText={helper}
            autoFocus={autoFocus}
        />
        {/* <pre>field: {JSON.stringify(field, null, 2)}</pre> */}
        </>
    );
}
