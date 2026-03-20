import React from 'react';
import { IconButton, Box, Avatar } from '@mui/material';
import { useAuthed } from '../../Paywall';
import { Icon } from '../../DesignSystem';

export interface I_User {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function User({ onClick }: I_User) {
    const authed = useAuthed();
    // const { avatar } = authed || {};

    
    return (
        <IconButton onClick={onClick} color="primary">
            <Icon icon={authed ? "user" : "account"} color="primary" />
        </IconButton>
    );
}
