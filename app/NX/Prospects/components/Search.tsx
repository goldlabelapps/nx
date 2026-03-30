'use client';
import * as React from 'react';
import { useRef, useCallback } from 'react';
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { 
    useProspects, 
    updateQuery,
    searchProspects,
} from '../../Prospects';
import {Icon} from '../../DesignSystem';

export interface I_Search {
    label?: string;
}

export default function Search({ label }: I_Search) {

    const dispatch = useDispatch();
    const prospects = useProspects();
    const search = prospects?.query?.search || '';


    // Debounce utility (only for searchProspects)
    const debouncedSearch = useRef<() => void>();
    if (!debouncedSearch.current) {
        let timer: ReturnType<typeof setTimeout>;
        debouncedSearch.current = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(searchProspects());
            }, 400);
        };
    }

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuery({ search: event.target.value }));
        debouncedSearch.current && debouncedSearch.current();
    }, [dispatch]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(updateQuery({ search }));
        }
    };

    return (
        <Box component="form">
            <TextField
                autoFocus
                fullWidth
                variant="standard"
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

