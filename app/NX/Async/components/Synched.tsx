"use client";
import React from 'react';
import {
    Box,
} from '@mui/material';
import { useAuthed } from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { useAsync } from '../../Async';

export interface I_Synched {
    id?: string;
}

export const Synched: React.FC<I_Synched> = ({ id }) => {
    const dispatch = useDispatch();
    const async = useAsync();
    const authed = useAuthed();
    const {
        subscribing,
        subscription,
    } = async || {};
    const {uid} = authed || {};

    React.useEffect(() => {
        if (uid && !subscribing && !subscription) {
            console.log('subscribe', uid)
            // dispatch(setAsync('subscribing', true));
            // dispatch(subscribeUser());
        }
    }, [subscribing, subscription, uid]);
    
    return (
        <Box>
            <pre style={{ color: 'black' }}>uid: {JSON.stringify(uid, null, 2)}</pre>
        </Box>
    );
};

export default Synched;
