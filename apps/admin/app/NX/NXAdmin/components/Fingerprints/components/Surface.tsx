'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    IconButton,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Box,
    List,
    ListItemText,
    ListItemButton,
    ListItemAvatar,
    Typography,
} from '@mui/material';
import { navigateTo, Icon } from '../../../../DesignSystem';
import { MultiMarker } from '../../../../Mapbox';
import { useDispatch } from '../../../../Uberedux';
import { 
    useSubscription, 
    initFingerprints,
    AvaFlag,
} from '../../Fingerprints';
import { useNXAdmin } from '../../../../NXAdmin';

export default function Surface() {
 
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedFingerprintId, setSelectedFingerprintId] = React.useState<string | null>(null);
    const [focusedGeo, setFocusedGeo] = React.useState<any>(null);
    // Subscribe to the latest fingerprints in real time
    const { fingerprints = [], loading } = useSubscription(5, 1);
    const nxAdmin = useNXAdmin();
    const didInit = React.useRef(false);
    const totalDocs = nxAdmin?.fingerprints?.totalDocs ?? '...';

    React.useEffect(() => {
        if (!didInit.current) {
            dispatch(initFingerprints());
            didInit.current = true;
        }
    }, [dispatch]);

    const handleFingerprintsClick = () => {
        dispatch(navigateTo(router, '/fingerprints'));
    };

    const handleFingerprintMapFocus = (fingerprintId: string, geo: any) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setSelectedFingerprintId(fingerprintId);
        setFocusedGeo(geo || null);
    };

    return (
        <Card variant="outlined">
            <CardHeader
                title={<Typography variant="h6">
                    {`Fingerprints`}
                </Typography>}
                avatar={
                    <IconButton onClick={handleFingerprintsClick} color="primary">
                        <Icon icon="fingerprint" />
                    </IconButton>
                }
                action={<>
                    <Button
                        fullWidth={false}
                        variant="outlined"
                        endIcon={<Icon icon="right" />}
                        onClick={() => dispatch(navigateTo(router, '/fingerprints'))}
                    >{totalDocs}</Button>
                </>}
            />
            <CardContent>

                <MultiMarker
                    markers={fingerprints.slice(0, 50).map((fp) => ({
                        id: fp.id,
                        geo: fp.geo,
                        avatarUrl: `https://goldlabel.pro/shared/svg/characters/${fp.avatar}.svg`,
                        countryCode: fp.geo?.country_code2 || null,
                    }))}
                    geos={fingerprints.slice(0, 50).map((fp) => fp.geo)}
                    focusGeo={focusedGeo}
                />
                <Box sx={{ height: 16 }} />
                
                {loading ? (
                    <Box>Loading latest fingerprints...</Box>
                ) : fingerprints.length === 0 ? (
                    <Box>No fingerprints found.</Box>
                ) : (
                    <Box>
                        <List disablePadding>
                            {fingerprints.slice(0, 10).map(fp => {
                                const name = fp.name || 'Unnamed';
                                const geo = fp.geo || {};
                                const country = geo.country_name || '';
                                const city = geo.city || '';
                                const ip = geo.ip || fp.ip || '';
                                const location = [country, city].filter(Boolean).join(', ');
                                return (
                                    <ListItemButton
                                        key={fp.id}
                                        sx={{ borderRadius: 1 }}
                                        selected={selectedFingerprintId === fp.id}
                                        disabled={selectedFingerprintId === fp.id}
                                        onClick={() => handleFingerprintMapFocus(fp.id, fp.geo)}
                                    >
                                        <ListItemAvatar>
                                            <AvaFlag
                                                avatarUrl={`https://goldlabel.pro/shared/svg/characters/${fp.avatar}.svg`}
                                                countryCode={geo.country_code2 || undefined}
                                                size={32}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<span style={{ fontWeight: 500 }}>{name}</span>}
                                            secondary={
                                                <>
                                                    {location && (
                                                        <span style={{ color: '#888' }}>{location}</span>
                                                    )}
                                                    {ip && (
                                                        <span style={{ color: '#aaa', marginLeft: 8 }}>IP: {ip}</span>
                                                    )}
                                                </>
                                            }
                                        />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
