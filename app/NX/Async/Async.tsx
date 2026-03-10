import React from 'react';
import {
    Box,
} from '@mui/material';


export interface I_Async {
    id?: string;
}

export const Async: React.FC<I_Async> = ({ id }) => {
    return (
        <Box id={id}>
            Async
        </Box>
    );
};

export default Async;
