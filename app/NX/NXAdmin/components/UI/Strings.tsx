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
    field,
    type = 'text',
    onChange,
}: {
    collection?: string;
    label: string;
    field?: string;
    type?: string;
    onChange?: (newValue: string) => void;
}) {

    const dispatch = useDispatch();
    const crud = useCRUD();

    const handleClick = () => {
        console.log('collection', collection);
        dispatch(setNXAdmin('active', null));
    };
    
    return (
        <>
        <TextField
            label={label}
            variant="outlined"
            type={type}
            onChange={e => onChange && onChange(e.target.value)}
            margin="normal"
        />
        {/* <pre>field: {JSON.stringify(field, null, 2)}</pre> */}
        </>
    );
}
