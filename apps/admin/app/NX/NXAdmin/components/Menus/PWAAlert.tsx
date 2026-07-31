'use client';
import * as React from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { useNXAdmin, triggerPwaInstall } from '../../../NXAdmin';

export default function PWAAlert() {
    const dispatch = useDispatch();
    // const nxAdmin = useNXAdmin();
    // const pwa = nxAdmin?.pwa || {};
    // const { supported, installed, installable } = pwa;

    const onInstallClick = React.useCallback(() => {
        dispatch(triggerPwaInstall());
    }, [dispatch]);

    // if (!supported || installed || !installable) return null;

    return (
        <Tooltip title="Install PWA">
            <IconButton 
                color="primary" 
                onClick={onInstallClick} 
                aria-label="Install PWA">
                <Badge color="warning" variant="dot" overlap="circular">
                    <Icon icon="download" />
                </Badge>
            </IconButton>
        </Tooltip>
    );
}