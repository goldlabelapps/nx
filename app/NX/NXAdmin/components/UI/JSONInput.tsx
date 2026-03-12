'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useDispatch } from '../../../../NX/Uberedux';
import { setNXAdmin, setCRUD, useCRUD } from '../../../NXAdmin'

export interface I_JSONInput {
    label: string;
    collection?: string;
}

export default function JSONInput({
    collection,
    label,
}: I_JSONInput) {

    const dispatch = useDispatch();
    const crud = useCRUD();
    const state = collection ? crud[collection] : undefined;
    
    return (
        <Box>
            <pre>state: {JSON.stringify(state, null, 2)}</pre>
            <InputLabel>{label}</InputLabel>
        </Box>
    );
}
