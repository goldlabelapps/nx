"use client";
import type { I_Chatbot } from './types'
import React, { useEffect, useRef } from 'react';
import {
    useTheme,
    Box,
    AppBar,
    Toolbar,
} from '@mui/material';
import { useFlash, setFlash } from '../../../Flash';
import { useDispatch } from '../../../Uberedux';
import {
    ChatbotAS,
    Prompt,
    // Response,
} from './';

const Chatbot = (props: I_Chatbot) => {
    const theme = useTheme();
    const flash = useFlash();
    const { chatbot } = flash;
    const dispatch = useDispatch();
    const as = useRef<any>(null);

    const logo = props.logo || <>no logo</>;

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
            waiting: true,
            messages: [],
            prompt: null,
        }));
    }, [dispatch]);

    return (
        <Box
            sx={{
                background: theme.palette.background.default,
                minHeight: '100vh',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <AppBar position="static" elevation={1} sx={{ background: 0, boxShadow: 0, mt: 2 }}>
                <Toolbar>
                    <Box sx={{ height: 50, mt: 1 }}>
                        {logo}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{
                flex: 1,
                overflow: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <pre style={{ padding: '1em', borderRadius: '8px' }}>
                    chatbot: {JSON.stringify(chatbot, null, 2)}
                </pre>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2, py: 4
                }}
                onSubmit={e => { e.preventDefault(); /* handle send here */ }}
            >
                <Prompt />
            </Box>
        </Box >
    );
};

export default Chatbot;

/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
    {JSON.stringify(flash, null, 2)}
</pre> */