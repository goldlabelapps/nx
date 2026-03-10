import React from 'react';
import {
    Box,
    Paper,
} from '@mui/material';

export interface I_Async {
    id?: string;
}

export const Async: React.FC<I_Async> = ({ id }) => {
    return (
        <Paper 
            sx={{
                p: 2,
            }}
            variant="outlined" id={id}>
            
        </Paper>
    );
};

export default Async;
