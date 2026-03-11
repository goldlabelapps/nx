import React from 'react';
import {
    Box,
    IconButton,
    Button,
    Paper,
} from '@mui/material';
import {
    Heart, 
    useAsync,
    initAsync,
} from '../Async'
import { useDispatch} from '../Uberedux';
import { Icon } from '../DesignSystem';

export interface I_Async {
    id?: string;
}

export const Async: React.FC<I_Async> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const {sessionStart} = state || {};

    React.useEffect(() => {
        if (!sessionStart) dispatch(initAsync());
    }, [dispatch, sessionStart]);

    return (
        <Paper 
            id={id}
            sx={{ p: 2, display: 'flex' }}
            variant="outlined">
            <Box sx={{ flexGrow: 1 }}>
                <Heart />
            </Box>
            <Box>
                <IconButton 
                    color="primary"
                    aria-label='Reset'
                    onClick={() => dispatch(initAsync())}>
                    <Icon icon="reset" />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default Async;
