'use client';
import * as React from 'react';
import { useRef, useCallback } from 'react';
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { 
    useProspects, 
    updateQuery,
    searchProspects,
    setProspects,
    resetQuery,
} from '../../Prospects';
import {Icon} from '../../DesignSystem';

export interface I_Search {
    label?: string;
}


export default function Search({ label }: I_Search) {
    const dispatch = useDispatch();
    const prospects = useProspects();
    const search = prospects?.query?.search || '';
    const searching = prospects?.searching || null;
    const pagination = prospects?.pagination || null;

    const helperText = pagination
        ? `Showing page ${pagination.page} of ${pagination.pages} (${pagination.total} results)`
        : 'Search by name, title, company, email, etc.';

    // Ref for the input
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounce utility (only for searchProspects)
    const debouncedSearch = useRef<() => void>(null);
    if (!debouncedSearch.current) {
        let timer: ReturnType<typeof setTimeout>;
        debouncedSearch.current = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(searchProspects());
                dispatch(setProspects('searching', true));
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

    const handleCancel = useCallback(() => {
        dispatch(resetQuery());
        // Focus the input after cancelling
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [dispatch]);

    return (
        <Box component="form">
            <TextField
                autoFocus
                fullWidth
                variant="filled"
                helperText={helperText}
                placeholder={label || 'Search'}
                inputProps={{ 'aria-label': 'Search' }}
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
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
                    endAdornment: (
                        <InputAdornment position="end">
                            {searching ? (
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CircularProgress size={20} thickness={5} />
                                    </span>
                                </span>
                            ) : search ? (
                                <IconButton
                                    color="primary"
                                    edge="end"
                                    aria-label="cancel search"
                                    onClick={handleCancel}
                                    tabIndex={0}
                                >
                                    <Icon icon="cancel" />
                                </IconButton>
                            ) : null}
                        </InputAdornment>
                    )
                }}
            />
            {/* <pre>pagination: {JSON.stringify(pagination, null, 2)}</pre> */}
        </Box>
    );
}

