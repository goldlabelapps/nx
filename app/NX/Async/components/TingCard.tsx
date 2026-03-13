import React from 'react';
import {
    Avatar,
    IconButton,
    Box,
    CardHeader,
    Chip,
} from '@mui/material';
import {
    Icon,
} from '../../DesignSystem'
import {
    useAsync,
    setAsync,
    Mapbox,
} from '../../Async'
import { useDispatch } from '../../Uberedux';

export interface I_TingCard {
    id?: string;
}

export const TingCard: React.FC<I_TingCard> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const { ting } = state || {};
    const {
        name,
        avatar,
    } = ting || {};

    const handleCloseDialog = () => {
        dispatch(setAsync('dialogOpen', false));
    };
    
    if (!ting) return null;
    const { geo, label, device } = ting;
    const { 
        isp,
        ip,
        currency,
    } = geo || {};

    const {
        browser,
        vendor,
        platform,
        os,
        isMobile,
        modelCode,
        model,
    } = device || {};

    return (
        <>
            <CardHeader
                avatar={avatar && <Avatar src={avatar} />}
                title={name}
                subheader={device?.label}
                action={<IconButton 
                            color="primary"
                            onClick={handleCloseDialog}
                        >
                            <Icon icon="close" />
                        </IconButton>}
            />
            
            {/* <pre>device: {JSON.stringify(device, null, 2)}</pre>  */}

                <Box sx={{my: 1}}>
                    {modelCode && <Chip
                        sx={{m:0.5}}
                        size="small"
                        label={modelCode}
                        variant="outlined"
                    />}
                    {model && <Chip
                        sx={{m:0.5}}
                        size="small"
                        label={model}
                    variant="outlined"
                    />}
                    {isMobile && <Chip
                    size="small"
                    sx={{m:0.5}}
                        label={`Mobile`}
                    variant="outlined"
                    />}
                    {os && <Chip
                    size="small"
                        sx={{ mx: 1 }}
                        label={`${os}`}
                    variant="outlined"
                    />}
                    {platform && <Chip
                    size="small"
                        sx={{ mx: 1 }}
                        label={`${platform}`}
                        variant="outlined"
                    />}
                    {vendor && <Chip
                    size="small"
                        sx={{ mx: 1 }}
                        label={`${vendor}`}
                    variant="outlined"
                    />}
                    {browser && <Chip
                    size="small"
                    sx={{m:0.5}}
                        label={`${browser}`}
                        variant="outlined"
                    />}
                    
                    {/* {currency && <Chip
                    size="small"
                        sx={{ mx: 1 }}
                            label={`${currency.currency_code} (${currency.currency_symbol})`}
                    variant="outlined"
                        />} */}

                {/* {ip && <Chip
                    size="small"
                    sx={{ mx: 1 }}
                    label={`IP ${ip}`}
                    variant="outlined"
                />} */}


                </Box>           
            <Box sx={{m:1}}>
                <Mapbox
                    country_code={geo?.country_code || ''}
                    label={isp || ''}
                    lat={56.02670}
                    lon={-3.43988}
                />
            </Box>
        </>

    );
};

export default TingCard;
