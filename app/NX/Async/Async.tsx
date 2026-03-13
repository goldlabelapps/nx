"use client";
import React from 'react';
import {
    Box,
    Avatar,
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
    const {sessionStart, ticks, ting} = state || {};

    React.useEffect(() => {
        console.log('initAsync');
        if (!sessionStart) dispatch(initAsync());
    }, [dispatch, sessionStart]);


    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);



        const avatar = ting?.avatar;
        const name = ting?.name;
    
    return (
        <>
            <AsyncDialog />
        </>
    );
};

export default Async;
