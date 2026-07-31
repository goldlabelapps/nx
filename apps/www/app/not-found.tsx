"use client";
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="not-found-page">
            not found.
            <Tooltip title="Go home">
                <IconButton aria-label="Go home" onClick={() => router.push('/')}>
                    <HomeOutlinedIcon />
                </IconButton>
            </Tooltip>
        </main>
    );
}
