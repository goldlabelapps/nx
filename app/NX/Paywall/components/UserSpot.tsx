"use client";
import React from 'react';
import { IconButton, Avatar } from '@mui/material';
import { Icon } from '../../DesignSystem';
import { usePaywall, subscribeAccount, setPaywall } from '../../Paywall';
import { useDispatch } from '../../Uberedux';

export interface I_UserSpot {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function UserSpot({ onClick }: I_UserSpot) {

    const paywall = usePaywall();
    const account = paywall ? paywall.account : null;
    const accountSubscribing = paywall ? paywall.accountSubscribing : null;
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!account && !accountSubscribing) {
            dispatch(setPaywall('accountSubscribing', true));
            dispatch(subscribeAccount());
        };
    }, [account, accountSubscribing, dispatch]);

    if (typeof window !== "undefined" && window.location.pathname === "/account") {
        return null;
    }
    
    return (
        <IconButton onClick={onClick} color="primary">
            {account ? (
                <Avatar alt={account.name} src={account.avatar} />
            ) : (
                <Icon icon="async" />
            )}
        </IconButton>
    );
}
