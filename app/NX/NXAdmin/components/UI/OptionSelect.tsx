'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    IconButton,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useDispatch } from '../../../../NX/Uberedux';
import { setNXAdmin, setCRUD, useCRUD } from '../../../NXAdmin'
import { Icon } from '../../../../NX/DesignSystem';

export default function OptionSelect({
    label,
    options,
    field,
    collection,
    onChange,
}: {
    label: string;
    options: any[];
    field?: string;
    collection?: string;
    onChange?: (newValue: string) => void;
}) {

    const dispatch = useDispatch();
    const crud = useCRUD();
    const state = collection ? crud[collection] : undefined;

    const handleClick = () => {
        console.log('collection', collection);
        dispatch(setNXAdmin('active', null));
    };
    
    return (
        <FormControl margin="normal" variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                onChange={e => onChange && onChange(e.target.value)}
                defaultValue=""
            >
                {options.map((opt, idx) => {
                    if (typeof opt === 'object' && opt !== null) {
                        return (
                            <MenuItem key={idx} value={opt.index !== undefined ? opt.index : opt.label || String(opt)}>
                                {opt.label || String(opt)}
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem key={idx} value={String(opt)}>
                            {String(opt)}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
