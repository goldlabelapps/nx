"use client";
import React from 'react';
import {
    useAsync,
    initAsync,
    tick,
    subscribeDoc,
    setAsync,
} from '../Async'
import { useDispatch} from '../Uberedux';
import { usePaywall } from '../Paywall';
import { AsyncDialog } from '../Async'

export const Async: React.FC<any> = () => {

    const dispatch = useDispatch();
    const state = useAsync();
    const { sessionStart, docId, subscribed } = state || {};
    const paywall = usePaywall();
    const {authChecked} = paywall || {};

    const subscribedRef = React.useRef(false);

    React.useEffect(() => {
        if (docId && !subscribed && !subscribedRef.current) {
            dispatch(subscribeDoc());
            subscribedRef.current = true;
        }
    }, [dispatch, docId, subscribed]);

    React.useEffect(() => {
        if (!sessionStart && authChecked){
            dispatch(initAsync());
        } 
    }, [dispatch, sessionStart, authChecked]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);
    
    return <>
        {/* <pre>subscribed:{JSON.stringify(subscribed, null, 2)}</pre> */}
    <AsyncDialog />
    </>
};

export default Async;
