'use client';
import * as React from 'react';
import {
    Paper,
    InputBase,
    IconButton,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { setProspects, Selecta } from '../../Prospects';
import {Icon} from '../../DesignSystem';

export default function FindProspect() {
    
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState('');
    const onSearch = (query: string) => {
        dispatch(setProspects('search', query));
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
        <Paper
            variant='outlined'
            component="form"
            sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%',
            }}>
            <IconButton 
                color="primary" 
                sx={{ p: '10px' }} 
                aria-label="menu">
                <Icon icon="search" />
            </IconButton>
            <InputBase
                autoFocus
                sx={{ ml: 1, flex: 1 }}
                placeholder="Find a prospect"
                inputProps={{ 'aria-label': 'Search products' }}
                value={search}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <IconButton 
                color="primary"
                sx={{ p: '10px' }} 
                aria-label="Favourites">
                <Icon icon="star" />
            </IconButton>

            
            
        </Paper>
    );
}

