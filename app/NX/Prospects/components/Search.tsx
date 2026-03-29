'use client';
import * as React from 'react';
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { updateQuery } from '../../Prospects';
import { useProspects } from '../../Prospects';
import {Icon} from '../../DesignSystem';

export interface I_Search {
    label?: string;
}

export default function Search({ label }: I_Search) {
    const dispatch = useDispatch();
    const prospects = useProspects();
    const search = prospects?.query?.search || '';

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuery({ search: event.target.value }));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(updateQuery({ search }));
        }
    };

    return (
        <Box component="form">
            <TextField
                fullWidth
                variant="outlined"
                placeholder={label || 'Search'}
                inputProps={{ 'aria-label': 'Search' }}
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton 
                                color="primary"
                                edge="start" 
                                tabIndex={-1} 
                                aria-label="search">
                                <Icon icon="search" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

