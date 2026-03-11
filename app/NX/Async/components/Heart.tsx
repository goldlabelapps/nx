import React from 'react';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
import {Icon} from '../../DesignSystem';
import {
    tick,
    useAsync,
} from '../../Async'
import { useDispatch } from '../../Uberedux';

export interface I_Heart {
    id?: string;
}

export const Heart: React.FC<I_Heart> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const {ticks} = state || {};

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(tick());
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch]);
    
    return (
        <Box id={id} sx={{
            display: 'flex',
        }}>
            <Box sx={{m:1}}>
                <Icon icon="heart" color="primary" />
            </Box>
            <Box sx={{mt:1, ml:2}}>
                <Typography variant="caption">
                    {ticks} secs
                </Typography>
            </Box>
        </Box>
    );
};

export default Heart;
