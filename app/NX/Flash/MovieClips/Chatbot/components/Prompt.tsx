"use client";
import React from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import { useFlash, setFlash } from '../../../../Flash';
import { useDispatch } from '../../../../Uberedux';
import { Icon } from '../../../../DesignSystem';

const Prompt = () => {

    const flash = useFlash() ?? {};
    const dispatch = useDispatch();
    const chatbot = flash.chatbot ?? {};
    const waiting = chatbot.waiting ?? false;
    const prompt = chatbot.prompt ?? '';
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPrompt = e.target.value;
        dispatch(setFlash('chatbot', {
            ...chatbot,
            prompt: newPrompt,
        }));
    };

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('handleReset', inputRef.current);
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('add message');

        const newMessage = {
            time: Date.now(),
            message: prompt,
        };

        // Ensure messages is an array
        const prevMessages = Array.isArray(chatbot.messages) ? chatbot.messages : [];
        const updatedMessages = [...prevMessages, newMessage];

        dispatch(setFlash('chatbot', { ...chatbot, messages: updatedMessages }));

        // Optionally clear the prompt after submit:
        // dispatch(setFlash('chatbot', { ...chatbot, prompt: '' }));

        // Refocus input
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                width: '100%',
            }}
        >
            <TextField
                fullWidth
                disabled={!waiting}
                placeholder="Prompt..."
                variant="outlined"
                sx={{ mr: 2, }}
                value={prompt}
                onChange={handleChange}
                inputRef={inputRef}
            />

            {/* <IconButton
                disabled={!waiting}
                color='primary'
                onClick={handleReset}
                sx={{ mt: 1 }}>
                <Icon icon="left" />
            </IconButton> */}

            <IconButton
                disabled={!waiting}
                color='primary'
                type="submit"
                aria-label="Prompt"

                sx={{ mt: 1 }}>
                <Icon icon="send" />
            </IconButton>
        </Box>
    );
};

export default Prompt;
