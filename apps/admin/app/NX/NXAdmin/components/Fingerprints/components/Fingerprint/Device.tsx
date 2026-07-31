'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Icon } from '../../../../../DesignSystem';

import type { I_Icon } from '../../../../../types';
import type { T_Fingerprint } from '../../types';

type T_IconName = I_Icon['icon'];

type T_Device = T_Fingerprint['device'] | undefined;
type T_DeviceWithExtras = (T_Fingerprint['device'] & { model?: string; modelCode?: string }) | undefined;

type I_DeviceData = {
    device?: T_Device;
    compact?: boolean;
    size?: 'small' | 'large';
};

const normalizeIconValue = (value?: string) => (value || '').trim().toLowerCase();

const getPlatformIcon = (value?: string): T_IconName => {
    const normalized = normalizeIconValue(value);
    if (!normalized) return 'desktop';
    if (normalized.includes('mobile') || normalized.includes('iphone') || normalized.includes('android') || normalized.includes('ios')) return 'mobile';
    if (normalized.includes('mac')) return 'desktopmac';
    if (normalized.includes('windows') || normalized.includes('win') || normalized.includes('linux') || normalized.includes('desktop')) return 'desktop';
    return 'desktop';
};

const getOSIcon = (value?: string): T_IconName => {
    const normalized = normalizeIconValue(value);
    if (!normalized) return 'info';
    if (normalized.includes('android')) return 'android';
    if (normalized.includes('ios') || normalized.includes('iphone') || normalized.includes('ipad')) return 'iphone';
    if (normalized.includes('mac') || normalized.includes('os x') || normalized.includes('darwin')) return 'macos';
    if (normalized.includes('windows') || normalized.includes('win')) return 'windows';
    if (normalized.includes('linux') || normalized.includes('ubuntu')) return 'linux';
    return 'info';
};

const getBrowserIcon = (value?: string): T_IconName => {
    const normalized = normalizeIconValue(value);
    if (!normalized) return 'info';
    if (normalized.includes('edge')) return 'edge';
    if (normalized.includes('firefox')) return 'firefox';
    if (normalized.includes('chrome') || normalized.includes('chromium')) return 'chrome';
    if (normalized.includes('safari')) return 'safari';
    return 'web';
};

const getIsMobileIcon = (value?: boolean): T_IconName => (value ? 'mobile' : 'desktop');

export default function Device({ device, compact = false, size = 'small' }: I_DeviceData) {
    const deviceWithExtras = device as T_DeviceWithExtras;
    const isMobile = device?.isMobile;
    const model = deviceWithExtras?.model;
    const modelCode = deviceWithExtras?.modelCode;
    const normalizedModel = normalizeIconValue(model);
    const normalizedModelCode = normalizeIconValue(modelCode);
    const resolvedModel = normalizedModel && normalizedModel === normalizedModelCode
        ? model
        : (model || modelCode);
    const os = (device as { os?: string; ['os ']?: string } | undefined)?.os
        ?? (device as { os?: string; ['os ']?: string } | undefined)?.['os '];
    const browser = device?.browser;

    // Only show model icon if it's mobile, never for desktop
    const metaItems: Array<{ label: string; value: string; icon: T_IconName }> = [
        ...((isMobile && resolvedModel) ? [{ label: 'model', value: resolvedModel, icon: 'mobile' as T_IconName }] : []),
        { label: 'os', value: os || 'Unknown', icon: getOSIcon(os) },
        { label: 'browser', value: browser || 'Unknown', icon: getBrowserIcon(browser) },
    ];

    if (size === 'small') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}>
                {metaItems.map((item) => (
                    <Icon key={item.label} icon={item.icon} color="primary" />
                ))}
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: compact ? 0 : 2 }}>
            {metaItems.map((item) => (
                <Box
                    key={item.label}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mr: compact ? 1.5 : 1,
                        mb: compact ? 0.25 : 1,
                        my: 1,
                    }}
                >
                    <Icon icon={item.icon} color="primary" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {item.value}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}
