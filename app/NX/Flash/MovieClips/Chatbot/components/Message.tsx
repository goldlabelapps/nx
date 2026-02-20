"use client";
import React from 'react';
import { alpha, Box, Avatar } from '@mui/material';
import { RenderMarkdown } from '../../../../Shortcodes';

export interface I_Message {
    text: string;
    from: 'user' | 'bot';
    avatar?: React.ReactNode;
}

const Message = ({ text, from, avatar }: I_Message) => {
    const isUser = from === 'user';
    const defaultAvatar = '/shared/svg/flags/uk.svg';
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
                    sx={{
                        border: `1px solid ${alpha('#000', 0.5)}`,
                        width: 50, height: 50,
                        ml: 2, mt: 1
                    }} />
            </Box>

            <Box
                sx={{
                    p: 1,
                    borderRadius: 2,
                    maxWidth: '70%',
                }}
            >
                <RenderMarkdown>
                    {text}
                </RenderMarkdown>
            </Box>
        </Box>
    );
};

export default Message;


