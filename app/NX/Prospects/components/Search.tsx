'use client';
import * as React from 'react';
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { setProspects, updateQuery } from '../../Prospects';
import {Icon} from '../../DesignSystem';

// ...existing code...
interface SearchProps {
    label?: string;
}

export default function Search({ label }: SearchProps) {
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState('');

    const onSearch = (query: string) => {
        dispatch(updateQuery({ search: query }));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        onSearch(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch(search);
        }
    };

    return (
        <Box component="form">
            <TextField
                // autoFocus
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

