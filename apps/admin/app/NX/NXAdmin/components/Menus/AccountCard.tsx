"use client";
import React from 'react';
import {
    Avatar,
    ButtonBase,
    Box,
    Typography,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import {
    usePaywall,
} from '../../../Paywall';
import { useDispatch } from '../../../Uberedux';
import { Icon, navigateTo } from '../../../DesignSystem';

export default function AccountCard() {
    const dispatch = useDispatch();
    const router = useRouter();
    const paywall = usePaywall();
    const pathname = usePathname();

    const { account } = paywall || {};
    const {
        level,
        name,
        avatar,
    } = account || {};

    const isAccountPage = pathname === '/account';

    const handleClick = () => {
        if (isAccountPage) return;
        dispatch(navigateTo(router, '/account'));
    };

    return (
        <ButtonBase
            sx={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
            }}
            onClick={handleClick}
            disabled={isAccountPage}
        >
            <Box sx={{ mb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                {avatar ? (
                    <Avatar src={avatar} alt={name} />
                ) : null}

                {[...Array(5)].map((_, i) => (
                    <Icon
                        key={`star_${i}`}
                        icon={i < (typeof level === 'number' ? level : 0) ? 'staron' : 'staroff'}
                    />
                ))}

                <Typography variant="caption" color="text.secondary">
                    {name}
                </Typography>
            </Box>
        </ButtonBase>
    );
}