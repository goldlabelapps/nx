"use client";
import React from 'react';
import {
    Box,
} from '@mui/material';
// import { useAuthed } from '../../Paywall';
import { useDispatch } from '../../Uberedux';
import { useAsync, setTing } from '../../Async';

export interface I_Synched {
    id?: string;
}

export const Synched: React.FC<I_Synched> = ({ id }) => {
    const dispatch = useDispatch();
    const async = useAsync();
    const { ting } = async || {};
    const subscribed = ting ? ting.subscribed : undefined;

    React.useEffect(() => {
        if (!subscribed) dispatch(setTing('subscribed', false));
    }, [subscribed]);

    return (
        <Box>
            {/* <pre>subscribed: {JSON.stringify(subscribed, null, 2)}</pre> */}
        </Box>
    );
};

export default Synched;
