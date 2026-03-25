'use client';
import type { T_Config } from '../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    IconButton,
    Avatar,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { usePaywall, setPaywall, useAccount } from '../../Paywall';

export interface I_ChooseAvatar {
    config: T_Config;
    children?: React.ReactNode;
};

export default function ChooseAvatar({
    config,
}: I_ChooseAvatar) {
    const dispatch = useDispatch();
    const account = useAccount();
    // console.log('account:', account);
    return (
        <>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <IconButton>
                    <Avatar src={account?.avatar || ''} />
                </IconButton>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 2,
                        left: '-50%',
                        transform: 'translateX(+60%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon icon="photo" color="info" />
                </Box>
            </Box>
        </>
    );
}
