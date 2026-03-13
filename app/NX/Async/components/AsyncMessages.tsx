import React from 'react';
import {
    useTheme,
    Box,
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
    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useAsync();
    const { ting } = state || {};
    if (!ting) return null;
    type Message = {
        align: 'left' | 'right';
        from: string;
        message: string;
        avatar: string;
    };
    const { messages } = ting as { messages: Message[] };
    

    return (
        <>
            <Box sx={{ mt: 1 }}>
                {Array.isArray(messages) && messages.map((msg: Message, idx: number) => (
                    <Box key={`msg_${idx}`} 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: msg.align === 'right' ? 'row-reverse' : 'row', alignItems: 'flex-end', mb: 2 }}>
                            
                        {/* Avatar */}
                        <Box sx={{ mr: msg.align === 'left' ? 1 : 0, ml: msg.align === 'right' ? 1 : 0 }}>
                            <Box component="img" src={msg.avatar} alt={msg.from} sx={{ width: 40, height: 40, borderRadius: '50%', boxShadow: 2 }} />
                        </Box>
                        
                        {/* Chat bubble */}
                        <Box
                            sx={{
                                bgcolor: theme.palette.background.default,
                                color: theme.palette.text.primary,
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                borderTopLeftRadius: msg.align === 'left' ? 0 : 2,
                                borderTopRightRadius: msg.align === 'right' ? 0 : 2,
                                maxWidth: 320,
                                boxShadow: 1,
                            }}
                        >
                            {msg.message}
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* <pre>device: {JSON.stringify(device, null, 2)}</pre>  */}     
        </>
    );
};

export default AsyncMessages;
