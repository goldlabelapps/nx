'use client';
import * as React from 'react';
import {
    Box,
    TextField,
    IconButton,
    Typography,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { setProspects, Selecta } from '../../Prospects';
import {Icon} from '../../DesignSystem';

export default function Fing() {
    
    const dispatch = useDispatch();
    const [Fing, setFing] = React.useState('');
    const onFing = (query: string) => {
        dispatch(setProspects('Fing', query));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFing(event.target.value);
        onFing(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onFing(Fing);
        }
    };

    return (
        <Box
            component="form"
            sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%',
            }}>
            <Typography variant='h2'>
                This is the Fing component
            </Typography>
        </Box>
    );
}

