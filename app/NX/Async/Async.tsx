"use client";
import React from 'react';
import {
    Box,
    IconButton,
    Badge,
} from '@mui/material';
import {
    useAsync,
    initAsync,
    tick,
    setAsync,
} from '../Async'
import { useDispatch} from '../Uberedux';
import { Icon } from '../DesignSystem';
import { AsyncDialog } from '../Async'

export interface I_Async {
    id?: string;
}

export const Async: React.FC<I_Async> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const {sessionStart, ticks} = state || {};

    React.useEffect(() => {
        if (!sessionStart) dispatch(initAsync());
        dispatch(setAsync('dialogOpen', true));
    }, [dispatch, sessionStart]);


    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const handleOpenDialog = () => {
        dispatch(setAsync('dialogOpen', true));
    };

    return (
        <>
            <AsyncDialog />
            <Box id={id}>
                <Badge badgeContent={state?.ticks ? ticks : null}>
                    <IconButton 
                        color="primary"
                        aria-label='Reset'
                        onClick={handleOpenDialog}>
                            <Icon icon="async" />
                    </IconButton>
                </Badge>
            </Box>
        </>
    );
};

export default Async;
