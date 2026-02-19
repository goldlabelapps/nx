"use client";
import type { I_Chatbot } from './types'
import React, { useEffect, useRef } from 'react';
import {
    Box,
} from '@mui/material';
import { useFlash, setFlash } from '../../../Flash';
import { useDispatch } from '../../../Uberedux';
import { ChatbotAS } from './';

const Chatbot = (props: I_Chatbot) => {

    const flash = useFlash();
    const { chatbot } = flash;
    const dispatch = useDispatch();
    const as = useRef<any>(null);

    useEffect(() => {
        as.current = new ChatbotAS();
        if (as.current.init) {
            as.current.init();
        }
        return () => {
            if (as.current && as.current.destroy) {
                as.current.destroy();
            }
        };
    }, [as]);

    useEffect(() => {
        dispatch(setFlash('chatbot', {
            initted: true,
        }));
    }, [dispatch]);

    return (
        <Box>
            <pre>
                props: {JSON.stringify(props, null, 2)}
            </pre>
        </Box>
    );
};

export default Chatbot;
