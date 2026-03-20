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
    const [hide, setHide] = React.useState(false);

    React.useEffect(() => {
        if (window.location.pathname === "/account") {
            setHide(true);
        }
    }, []);

    if (hide) return null;

    return (
        <IconButton onClick={onClick} color="primary">
            <Icon icon="account" />
        </IconButton>
    );
}

