import React from 'react';
import {
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
} from '../../Async'
import { useDispatch } from '../../Uberedux';

export interface I_AsyncMessages {
    id?: string;
}

export const AsyncMessages: React.FC<I_AsyncMessages> = ({ id }) => {

    const dispatch = useDispatch();
    const state = useAsync();
    const { ting } = state || {};    
    if (!ting) return null;
    
    const messages = [
        {
            align: 'left',
            from: 'nx',
            message: 'lorem ipsum',
            avatar: '/shared/svg/characters/chix.svg'
        },
        {
            align: 'right',
            from: 'terry',
            message: 'dolar immet',
            avatar: '/shared/svg/characters/dapper.svg'
        }
    ]

    return (
        <>
            <Box sx={{ mt: 1 }}>
                {messages.map}
            </Box>  
            {/* <pre>device: {JSON.stringify(device, null, 2)}</pre>  */}     
        </>
    );
};

export default AsyncMessages;
