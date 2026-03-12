import React from 'react';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
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
        <Box id={id} sx={{}}>
            <Typography variant="caption">
                {ticks}
            </Typography>
        </Box>
    );
};

export default Heart;
