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
    Typography,
} from '@mui/material';
import { navigateTo } from '../../../../../DesignSystem';
import { useDispatch } from '../../../../../Uberedux';
import { AvaFlag } from '../../../Prospects';
import { formatDeviceSummary } from '../../utils';

export type T_Panel = {
    prospect: any;
    mode?: 'listitem' | 'detail';
};

export default function Panel({
    prospect,
    mode = 'listitem',
}: T_Panel) {

    const dispatch = useDispatch();
    const router = useRouter();

    const countryCode = prospect?.geo?.country_code2 || null;
    
    const handleClick = () => {
        dispatch(navigateTo(router, `/prospects/${encodeURIComponent(prospect.id)}`));
    };

    if (mode !== 'listitem') {
        return (
            <Box sx={{ p: 2 }}>
                <pre>{JSON.stringify(prospect?.id, null, 2)}</pre>
            </Box>
        );
    }

    const geo = prospect?.geo || {};
    const city = geo.city || 'Unknown';
    const ip = geo.ip || 'Unknown';

    return (
        <Card sx={{ mb: 1 }} variant="outlined">
            <CardActionArea onClick={handleClick}>
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
                                    avatarUrl={`https://goldlabel.pro/shared/svg/characters/${prospect.avatar}.svg`}
                                    size={64}
                                    position="bottom-left"
                                />
                            )}
                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="h6" sx={{ mb: 0.5 }} noWrap>
                                    {prospect.name || formatDeviceSummary(prospect.device) || 'Unknown prospect'}
                                </Typography>
                            </Box>
                        </Box>
                        
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
