'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Paper,
    ButtonBase,
} from '@mui/material';
import { Icon, navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function ContentCard({
    slugs = '',
}: {
    slugs?: string[];
}) {

    const dispatch = useDispatch();
    const router = useRouter();


    return (
        <ButtonBase
            sx={{
                textAlign: 'left',
                width: '100%',
            }}
        >
            <Paper variant="outlined" sx={{ p: 2, width: '100%', display: 'flex' }}>
                <Icon icon="github" color="primary" />
                <Typography variant="h6" sx={{ ml: 2 }}>
                    sASAD
                </Typography>
            </Paper>
        </ButtonBase>
    );
}
