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
    const defaultAvatar = '/shared/svg/characters/punk.svg';
    return (
        <Box
            sx={{
                // border: '1px solid white',
                display: 'flex',
                alignItems: 'flex-start',
                mb: 1,
                flexDirection: isUser ? 'row-reverse' : 'row',
            }}
        >

            <Box sx={{}}>
                <Avatar
                    src={avatar ? undefined : defaultAvatar}
                    alt={from}
                    sx={{ width: 50, height: 50 }} />
            </Box>

            <Box
                sx={{
                    // bgcolor: isUser ? '#f3e5f5' : '#e3f2fd',
                    p: 1,
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


