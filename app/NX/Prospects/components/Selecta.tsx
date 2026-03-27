'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from '../../Uberedux';
import { setProspects, useProspects, useInitialData } from '../../Prospects';
import {Icon} from '../../DesignSystem';

export type T_SelectaItem = {
    label: string;
    value: string;
}

export interface I_Selecta {
    label: string;
    list: T_SelectaItem[];
}

export default function Selecta({ 
    label = 'bollix', 
    list = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },    
    ],
}: I_Selecta) {
    
    const dispatch = useDispatch();
    const initialData = useInitialData();

    return (
        <Autocomplete
            id="selecta-autocomplete"
            sx={{ width: '100%' }}
            options={list}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

