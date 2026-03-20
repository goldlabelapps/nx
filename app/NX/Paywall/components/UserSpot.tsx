"use client";
import React from 'react';
import { IconButton, Box, Avatar } from '@mui/material';
import { useIsAuthed } from '../../Paywall';
import { Icon } from '../../DesignSystem';

export interface I_UserSpot {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function UserSpot({ onClick }: I_UserSpot) {
    const isAuthed = useIsAuthed();
    if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (pathname === "/account") {
            return null;
        }
    }
    return (
        <IconButton onClick={onClick} color="primary">
            <Icon icon="account" />
        </IconButton>
    );
}

