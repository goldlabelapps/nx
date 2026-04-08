'use client';
import * as React from 'react';
import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import {
    useDispatch,
} from '../../Uberedux';
import {
    Icon,
} from '../../DesignSystem';
import {
    useProspects,
} from '../../Prospects';

export default function Email() {

    const state = useProspects();
    const loading = state?.loading;

    return (
        <>

            
        </>
    );
}
