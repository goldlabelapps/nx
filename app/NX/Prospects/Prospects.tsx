'use client';
import type { T_Config } from '../types';
import * as React from 'react';
import {
    Typography,
} from '@mui/material';
import {
    FindProspect,
} from '../Prospects';

export interface I_Prospects {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Prospects({
    config,
}: I_Prospects) {

    return (
        <>
            <Typography 
                sx={{ mx: 1 }}
                variant="body1" gutterBottom>
                Here we are looking to identify a single prospect for us to 
                focus on. The goal is to be as quick and accurate as possible 
                with as few clicks/taps and keyboard inputs as possible
            </Typography>
            <FindProspect />
        </>
    );
}
