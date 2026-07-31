'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Tooltip,
    Typography,
} from '@mui/material';
import { navigateTo } from '../../../../../DesignSystem';
import { useDispatch } from '../../../../../Uberedux';
import { Device, AvaFlag } from '../../../Fingerprints';
import { formatDeviceSummary } from '../../utils';

export type T_Panel = {
    fingerprint: any;
    mode?: 'listitem' | 'detail';
    onClick?: () => void;
    selected?: boolean;
    disabled?: boolean;
};

export default function Panel({
    fingerprint,
    mode = 'listitem',
    onClick,
    selected = false,
    disabled = false,
}: T_Panel) {

    const dispatch = useDispatch();
    const router = useRouter();

    const countryCode = fingerprint?.geo?.country_code2 || null;
    
    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        dispatch(navigateTo(router, `/fingerprints/${encodeURIComponent(fingerprint.id)}`));
    };

    if (mode !== 'listitem') {
        return (
            <Box sx={{ p: 2 }}>
                <pre>{JSON.stringify(fingerprint?.id, null, 2)}</pre>
            </Box>
        );
    }

    const geo = fingerprint?.geo || {};
    const city = geo.city || 'Unknown';
    const ip = geo.ip || 'Unknown';

    const history: any[] = fingerprint?.history || [];
    const currentPage = history.length > 0
        ? history.reduce((latest: any, entry: any) =>
            (entry.timestamp > latest.timestamp ? entry : latest), history[0])
        : null;

    return (
        <Card
            sx={{
                mb: 1,
                borderColor: selected ? 'secondary.main' : undefined,
                backgroundColor: selected ? 'action.selected' : undefined,
                boxShadow: selected ? 4 : 0,
                transform: selected ? 'translateY(-1px)' : 'none',
                transition: 'all 220ms ease',
            }}
            variant="outlined"
        >
            <CardActionArea onClick={handleClick} disabled={disabled}>
                <CardContent sx={{ p: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'center' },
                            gap: 2,
                        }}
                    >
                        {/* Avatar + Info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                            {countryCode && (
                                <AvaFlag
                                    countryCode={countryCode}
                                    avatarUrl={`https://goldlabel.pro/shared/svg/characters/${fingerprint.avatar}.svg`}
                                    position="bottom-left"
                                />
                            )}
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="h6" sx={{ mb: 0.5 }} noWrap>
                                    {fingerprint.name || formatDeviceSummary(fingerprint.device) || 'Unknown device'}
                                </Typography>
                                
                            </Box>
                        </Box>
                        
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}