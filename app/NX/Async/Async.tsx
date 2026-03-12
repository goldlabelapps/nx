"use client";
import React from 'react';
import {
    Box,
    IconButton,
    Divider,
    Paper,
} from '@mui/material';
import {
    Heart, 
    useAsync,
    initAsync,
} from '../Async'
import { useDispatch} from '../Uberedux';
import { Icon } from '../DesignSystem';

export interface I_Async {
    id?: string;
}

export const Async: React.FC<I_Async> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const {sessionStart} = state || {};

    React.useEffect(() => {
        if (!sessionStart) dispatch(initAsync());
    }, [dispatch, sessionStart]);

    return (
        <>
        <Box 
            id={id}
            sx={{ 
                display: 'flex',
            }}>
            <Box sx={{ mt: 0.75 }}>
                <Heart />
            </Box>
            <Box>
                <IconButton 
                    color="primary"
                    aria-label='Reset'
                    onClick={() => dispatch(initAsync())}>
                    <Icon icon="heart" />
                </IconButton>
            </Box>
        </Box>
        </>
    );
};

export default Async;
