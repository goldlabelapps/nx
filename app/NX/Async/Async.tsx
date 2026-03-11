import React from 'react';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
import {
    Heart, 
    useAsync,
    initAsync,
} from '../Async'
import { useDispatch} from '../Uberedux';

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
            sx={{ p: 2 }}
            variant="outlined" 
        >
            <Heart />
            {/* <Typography>
                Async 
            </Typography> */}
            <pre>state: 
                {JSON.stringify(state, null, 2)}
            </pre>
        </Paper>
    );
};

export default Async;
