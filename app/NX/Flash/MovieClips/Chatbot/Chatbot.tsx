"use client";
import type { I_Chatbot } from './types'
import React, { useEffect, useRef } from 'react';
import {
    Box,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    TextField,
    IconButton,
    Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFlash, setFlash } from '../../../Flash';
import { useDispatch } from '../../../Uberedux';
import { Icon } from '../../../DesignSystem';
import { ChatbotAS, Message } from './';

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
        <Paper
            elevation={3}
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
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    {props.icon && (
                        <Icon icon={props.icon} color="inherit" />
                    )}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {props.title || 'Chatbot'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Message
                    text="Hello! I'm your friendly chatbot. How can I assist you today?"
                    from="bot"
                />

                <Message
                    text="Hkjsdfj fodnms fonfsufoen. fowef"
                    from="user"
                />

                <Message
                    text="Hello! I'm your friendly chatbot. How can I assist you today?"
                    from="bot"
                />
            </Box>
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
                    placeholder="Type your message..."
                    variant="outlined"
                    sx={{ mr: 1 }}
                />
                <IconButton type="submit" color="primary" aria-label="send">
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper >
    );
};

export default Chatbot;
