'use client';
import * as React from 'react';
import type { I_Icon } from '../../types';
import {
    Chip,
    Collapse,
    TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import { useDispatch } from '../../Uberedux';
// import { setProspects, useProspects, useInitialData } from '../../Prospects';
import {Icon} from '../../DesignSystem';

export type T_ChipSelectItem = {
    label: string;
    value: string;
}

export interface I_ChipSelect {
    icon?: string;
    label: string;
    list?: T_ChipSelectItem[];
    value?: string | null;
    onChange?: (value: string | null) => void;
}

export default function ChipSelect({
    icon,
    label = 'Bo',
    list = [
        { label: 'Selecta 1', value: 'option1' },
        { label: 'Selecta 2', value: 'option2' },
        { label: 'Selecta 3', value: 'option3' },
    ],
    value = null,
    onChange,
}: I_ChipSelect) {
    
    // const dispatch = useDispatch();
    // const initialData = useInitialData();

    const [collapseOpen, setCollapseOpen] = React.useState(false);
    const [autoOpen, setAutoOpen] = React.useState(false);

    // Open Autocomplete dropdown when Collapse is shown
    React.useEffect(() => {
        if (collapseOpen) {
            setAutoOpen(true);
        } else {
            setAutoOpen(false);
        }
    }, [collapseOpen]);

    return (
        <>
            <Chip
                sx={{ p: 2.5, width: '100%' }}
                label={label}
                icon={<Icon icon={icon as any} color="primary"/>}
                onClick={() => setCollapseOpen((prev) => !prev)}
            />

            <Collapse in={collapseOpen}>
                <Autocomplete
                    sx={{mt: 1}}
                    options={list}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    value={value ? list.find(item => item.value === value) || null : null}
                    onChange={(
                        _event: React.SyntheticEvent,
                        v: T_ChipSelectItem | null
                    ) => onChange?.(v ? v.value : null)}
                    open={autoOpen}
                    onOpen={() => setAutoOpen(true)}
                    onClose={() => setAutoOpen(false)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            sx={{ width: '100%' }}
                            label={label}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                />
            </Collapse>
        </>
    );
}

