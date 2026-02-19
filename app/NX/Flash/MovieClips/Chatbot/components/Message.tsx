"use client";
import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

export interface I_Message {
    text: string;
    from: 'user' | 'bot';
    avatar?: React.ReactNode;
}


const Message = ({ text, from, avatar }: I_Message) => {
    const isUser = from === 'user';
    return (
        <Box
            sx={{
                border: '1px solid white',
                display: 'flex',
                alignItems: 'flex-start',
                mb: 1,
                flexDirection: isUser ? 'row-reverse' : 'row',
            }}
        >
            {avatar ? (
                <Box sx={{ ml: isUser ? 1 : 0, mr: isUser ? 0 : 1, p: 1 }}>{avatar}</Box>
            ) : (
                <Box sx={{ ml: isUser ? 1 : 0, mr: isUser ? 0 : 1, p: 1 }}>
                    <Avatar
                        sx={{
                            bgcolor: isUser ? 'secondary.main' : 'primary.main',
                            width: 32,
                            height: 32,
                        }}
                    >
                        {isUser ? 'U' : 'B'}
                    </Avatar>
                </Box>
            )}
            <Box
                sx={{
                    // bgcolor: isUser ? '#f3e5f5' : '#e3f2fd',
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                }}
            >
                <Typography variant="body1">{text}</Typography>
            </Box>
        </Box>
    );
};

export default Message;


