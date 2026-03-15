"use client";
import React from 'react';
// import {
//     Box,
// } from '@mui/material';
import {
    useAsync,
    initAsync,
    tick,
    setAsync,
} from '../Async'
import { useDispatch} from '../Uberedux';
// import { useAuthed } from '../Paywall';
import { AsyncDialog } from '../Async'

export interface I_Async {
    id?: string;
}

export const Async: React.FC<I_Async> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const { sessionStart, ting } = state || {};
    // const authed = useAuthed();
    // const {uid} = authed || {};
    
    React.useEffect(() => {
        if (!sessionStart) dispatch(initAsync());
    }, [dispatch, sessionStart]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);
    
    return (
        <>
            {/* <pre style={{ color: 'black', fontSize: 10 }}>
                uid: {JSON.stringify(uid, null, 2)}
            </pre> */}
            <AsyncDialog />
        </>
    );
};

export default Async;
