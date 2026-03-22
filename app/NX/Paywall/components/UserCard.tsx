"use client";
import React from 'react';
import { 
    Box,
} from '@mui/material';
import { usePaywall, useIsAuthed, useUID } from '../../Paywall';
import { Icon } from '../../DesignSystem';

export interface I_UserCard {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function UserCard({ onClick }: I_UserCard) {
    const paywall = usePaywall();
    const uid = useUID();
    const {account} = paywall || {};

    return (<>
            <Box display="flex" alignItems="center" gap={1}>
                <Icon icon="user" />
            </Box>
            <pre>account: {JSON.stringify(account, null, 2)}</pre>
        </>
    );
}
