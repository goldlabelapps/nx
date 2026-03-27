'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { useDispatch } from '../../Uberedux';
// import { setProspects, useProspects, useInitialData } from '../../Prospects';
// import {Icon} from '../../DesignSystem';

export type T_SelectaItem = {
    label: string;
    value: string;
}

export interface I_Selecta {
    label: string;
    list: T_SelectaItem[];
    onChange?: (value: string | null) => void;
}

export default function Selecta({ 
    label = 'Bo', 
    list = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },    
    ],
    onChange,
}: I_Selecta) {
    
    // const dispatch = useDispatch();
    // const initialData = useInitialData();

    return (
        <Autocomplete
            options={list}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={(_event, value) => onChange?.(value ? value.value : null)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    sx={{ minWidth: 300 }}
                    label={label}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}

