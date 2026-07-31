'use client';

import type { T_Fingerprint } from '../../../../types'; 
import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import {
    Card,
    CardContent,
    CardHeader,
    Box,
    Typography,
    Grid,
    List,
    IconButton,
} from '@mui/material';
import { Icon, navigateTo } from '../../../../../DesignSystem';
import { useDispatch } from '../../../../../Uberedux';
import { formatDeviceSummary, formatLanguages } from '../../utils';
import { updateFingerprint } from '../../actions/updateFingerprint';
import { AvaFlag, } from '../../../Fingerprints';
import { Mapbox } from '../../../../../Mapbox';

interface I_Detail {
    fingerprint: T_Fingerprint;
}

type T_HistoryEntry = NonNullable<T_Fingerprint['history']>[number];

// Helper to clean up URLs for display
function cleanUrl(url: string) {
    let u = url.replace(/^https?:\/\//, '');
    if (u.endsWith('/')) u = u.slice(0, -1);
    return u;
}

const InfoItem: React.FC<{ label?: string; value: string | React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <Box sx={{ mb: 2 }}>
        {label && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                {icon && <Box sx={{ mr: 1, color: 'text.secondary' }}>{icon}</Box>}
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                    {label}
                </Typography>
            </Box>
        )}
        <Box sx={{ color: 'text.primary' }}>{value}</Box>
    </Box>
);

export const Detail: React.FC<I_Detail> = ({
    fingerprint,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleBack = () => {
        dispatch(navigateTo(router, '/fingerprints'));
    };

    const geo = fingerprint?.geo || {};
    const device = fingerprint?.device || {};
    const history: NonNullable<T_Fingerprint['history']> = fingerprint?.history || [];
    const [historyItems] = React.useState<T_HistoryEntry[]>(history);
    const currentPage = historyItems.length > 0
        ? historyItems.reduce((latest: T_HistoryEntry, entry: T_HistoryEntry) => (
            entry.timestamp > latest.timestamp ? entry : latest
        ), historyItems[0])
        : null;
    const countryCode = geo.country_code2 || null;
    const [editingName, setEditingName] = useState(false);
    const [nameValue, setNameValue] = useState(fingerprint.name || '');
    const inputRef = useRef<HTMLInputElement>(null);
    const displayName = nameValue || formatDeviceSummary(fingerprint.device) || 'Unknown device';
    const locationSummary = React.useMemo(() => {
        const parts: string[] = [];
        const place = [geo.city, geo.state_prov, geo.country_name].filter(Boolean).join(', ');

        if (place) parts.push(place);
        if (geo.district) parts.push(`District ${geo.district}`);
        if (geo.zipcode) parts.push(`ZIP ${geo.zipcode}`);
        if (geo.ip) parts.push(`IP ${geo.ip}`);
        if (geo.isp) parts.push(`ISP ${geo.isp}`);
        if (geo.connection_type) parts.push(`${geo.connection_type} connection`);
        if (geo.time_zone?.name) parts.push(`TZ ${geo.time_zone.name}`);
        if (geo.currency?.code || geo.currency?.symbol) {
            const symbol = geo.currency?.symbol ? ` ${geo.currency.symbol}` : '';
            parts.push(`Currency ${geo.currency?.code || ''}${symbol}`.trim());
        }

        return parts.join(' · ') || 'No location metadata available';
    }, [
        geo.city,
        geo.state_prov,
        geo.country_name,
        geo.district,
        geo.zipcode,
        geo.ip,
        geo.isp,
        geo.connection_type,
        geo.time_zone?.name,
        geo.currency?.code,
        geo.currency?.symbol,
    ]);
    const deviceSummary = React.useMemo(() => {
        const parts: string[] = [];
        const browser = [device.browser, device.browserVersion].filter(Boolean).join(' ');
        const os = [device.os, device.osVersion].filter(Boolean).join(' ');
        const model = device.model || device.modelCode;

        if (browser) parts.push(`Browser ${browser}`);
        if (os) parts.push(`OS ${os}`);
        if (device.platform) parts.push(`Platform ${device.platform}`);
        if (model) parts.push(`Model ${model}`);
        if (device.vendor) parts.push(`Vendor ${device.vendor}`);
        parts.push(`Type ${device.isMobile ? 'Mobile' : 'Desktop'}`);

        if (Array.isArray(device.languages) && device.languages.length > 0) {
            parts.push(`Languages ${formatLanguages(device.languages)}`);
        }

        return parts.join(' · ') || 'No device metadata available';
    }, [
        device.browser,
        device.browserVersion,
        device.os,
        device.osVersion,
        device.platform,
        device.model,
        device.modelCode,
        device.vendor,
        device.isMobile,
        device.languages,
    ]);

    const handleNameEdit = () => {
        setEditingName(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(e.target.value);
    };

    const handleNameBlur = async () => {
        setEditingName(false);
        if (nameValue !== fingerprint.name) {
            await dispatch(updateFingerprint(fingerprint.id, 'name', nameValue));
        }
    };

    const handleNameKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
        } else if (e.key === 'Escape') {
            setNameValue(fingerprint.name || '');
            setEditingName(false);
        }
    };

    return (
        <Box sx={{  }}>
            {/* ...existing code... */}
            <Card sx={{ mb: 3 }} variant="outlined">
                <CardHeader
                    avatar={<><IconButton onClick={handleBack} ><Icon icon="left" /></IconButton></>}
                    action={countryCode ? (
                        <AvaFlag
                            countryCode={countryCode}
                            avatarUrl={`https://goldlabel.pro/shared/svg/characters/${fingerprint.avatar}.svg`}
                            size={90}
                            position="bottom-left"
                        />
                    ) : undefined}
                    title={
                        editingName ? (
                            <TextField
                                inputRef={inputRef}
                                value={nameValue}
                                onChange={handleNameChange}
                                onBlur={handleNameBlur}
                                onKeyDown={handleNameKeyDown}
                                variant="filled"
                                fullWidth
                                size="small"
                                InputProps={{
                                    disableUnderline: false,
                                    style: {
                                        fontSize: 28,
                                        fontWeight: 700,
                                        padding: 0,
                                        margin: 0,
                                        background: 'transparent',
                                    },
                                }}
                                inputProps={{
                                    maxLength: 64,
                                    style: {
                                        padding: 0,
                                    },
                                }}
                                sx={{
                                    '& .MuiFilledInput-root': {
                                        background: 'transparent',
                                        fontSize: 28,
                                        fontWeight: 700,
                                        padding: 0,
                                    },
                                }}
                            />
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h4" component="h1" sx={{ cursor: 'pointer' }} onClick={handleNameEdit}>
                                    {displayName}
                                </Typography>
                                <IconButton size="small" onClick={handleNameEdit} aria-label="Edit name">
                                    <Icon icon="edit" />
                                </IconButton>
                            </Box>
                        )
                    }
                />
                <CardContent sx={{ pt: 0 }}>
                            
                            {currentPage && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>

                            <Typography variant="caption" color="text.secondary">
                                Last seen {moment(fingerprint.updated).fromNow()}
                            </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: 420,
                                            display: 'block',
                                        }}
                                    >   on { cleanUrl(currentPage.url)}
                                    </Typography>

                            
                                    <Typography variant="caption" color="text.secondary">
                                        from IP {geo.ip || 'Unknown'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        using {device.browser || 'Unknown browser'} · {device.os || 'Unknown OS'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        using {device.platform || 'Unknown platform'}
                                    </Typography>
                                    
                                </Box>
                            )}
                           
                

            <Grid container spacing={3} sx={{mt:4}}>
                         
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="geo" />
                        <Typography variant="h6">Location</Typography>
                    </Box>

                    <Mapbox
                        geo={geo}
                    />
                    <Box sx={{mt:2}}>
                        <InfoItem value={locationSummary} />
                    </Box>
                </Grid>

               <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon icon="aicase" />
                        <Typography variant="h6">History</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            {historyItems.length} visits
                        </Typography>
                    </Box>
                    {historyItems.length > 0 ? (
                        <List>
                            {historyItems.map((item: any, index: number) => (
                                <React.Fragment key={index}>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                flexWrap: 'wrap',
                                                mb: 1,
                                            }}>
                                                {/* Removed tenant avatar */}
                                                <Typography variant="body2">
                                                    {cleanUrl(item.url)}
                                                </Typography>
                                                <Typography variant="caption" color="text.disabled">
                                                    {moment(item.timestamp).fromNow()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                </React.Fragment>
                            ))}
                        </List>
                            ) : (
                                <Box sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        No browsing history available
                                    </Typography>
                                </Box>
                            )}
                        </Grid>


                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Icon icon="mobile" />
                                <Typography variant="h6">Device</Typography>
                            </Box>
                            <InfoItem value={deviceSummary} />
                            
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};