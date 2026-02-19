"use client";
import React from 'react';
import { useTheme } from '@mui/material';

const Chatbot = () => {
    const theme = useTheme();
    const fill = theme.palette.primary.main;
    return (
        <>
            Chatbot
        </>
    );
};

export default Chatbot;
