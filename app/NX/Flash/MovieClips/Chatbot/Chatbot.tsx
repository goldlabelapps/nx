"use client";
import type { I_Chatbot } from './types'
import React, { useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    AppBar,
    Toolbar,
    TextField,
    IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFlash, setFlash } from '../../../Flash';
import { useDispatch } from '../../../Uberedux';
import { Icon } from '../../../DesignSystem';

import {
    ChatbotAS,
    Message,
    Resonse,
} from './';

const Chatbot = (props: I_Chatbot) => {

    const flash = useFlash();
    // const { chatbot } = flash;
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
            initted: true,
            messages: [
                {
                    id: '1',
                    text: 'Hello, how can I assist you today?',
                    from: 'bot',
                },
                {
                    id: '2',
                    text: 'I have a question about your product.',
                    from: 'user',
                },
            ],
        }));
    }, [dispatch]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                m: 0,
                p: 0,
                borderRadius: 0,
            }}
        >
            <AppBar position="static" elevation={1} sx={{ background: 0 }}>
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

                <Message
                    text="Who the **fuck** is this?"
                    from="user"
                />
                <Resonse />

            </Box>

            {/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
                {JSON.stringify(flash, null, 2)}
            </pre> */}


            <Box
                component="form"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                }}
                onSubmit={e => { e.preventDefault(); /* handle send here */ }}
            >
                <TextField
                    fullWidth
                    placeholder="Prompt..."
                    variant="standard"
                    sx={{ mr: 1 }}
                />
                <IconButton type="submit" color="primary" aria-label="send">
                    <Icon icon="send" />
                </IconButton>
            </Box>
        </Box >
    );
};

export default Chatbot;
