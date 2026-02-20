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

    const focusPrompt = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        inputRef.current?.focus();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('add message');

        const newChunk = {
            time: Date.now(),
            prompt,
        };

        // Ensure messages is an array
        const prevChunks = Array.isArray(chatbot.chunks) ? chatbot.chunks : [];
        const updatedChunks = [...prevChunks, newChunk];

        dispatch(setFlash('chatbot', {
            ...chatbot,
            chunks: updatedChunks,
            prompt: '',
            waiting: true,
        }));

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

            <IconButton
                disabled={!waiting || !prompt}
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
