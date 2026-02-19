"use client";
import React from 'react';
import { useTheme } from '@mui/material';

const NewMC = () => {
    const theme = useTheme();
    const fill = theme.palette.primary.main;
    return (
        <>
            NewMC
        </>
    );
};

export default NewMC;
