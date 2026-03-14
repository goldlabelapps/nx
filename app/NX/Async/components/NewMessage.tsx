"use client";
import React from 'react';
import {
    Avatar,
    useTheme,
    Box,
    IconButton,
    Button,
    TextField,
} from '@mui/material';
import {
    Icon,
} from '../../DesignSystem'
import {
    useAsync,
    sendMessage,
    setAsync,
} from '../../Async'
import { useDispatch } from '../../Uberedux';

export interface I_NewMessage {
    id?: string;
}

export const NewMessage: React.FC<I_NewMessage> = ({ id }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useAsync();
    const [value, setValue] = React.useState("");
    const { ting } = state || {};
    if (!ting) return null;

    const {avatar, name} = ting;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSend = () => {
        const newMessage = {
            to: id || 'unknown',
            message: value,
            avatar: 'https://i.pravatar.cc/150?img=3',
            align: 'right',
        };
        // console.log('newMessage', newMessage);
        // dispatch(sendMessage(newMessage as any))
        // setValue("");
    };
    
    const handleOpenDialog = () => {
        dispatch(setAsync('dialogOpen', true));
    };

    return (
        <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            gap: 2, 
            py: 1,
        }}>

            
            {/* {(avatar || name) && (
                <Box>
                    <IconButton
                        color="primary"
                        aria-label='Reset'
                        onClick={handleOpenDialog}
                    >
                        <Avatar sx={{border: `2px solid ${theme.palette.primary.main}`}} src={avatar ?? undefined} alt={name ?? ''} />
                    </IconButton>
                </Box>
            )} */}

            <Box sx={{ flex: 1 }}>
                <TextField
                    autoFocus
                    size='small'
                    fullWidth
                    value={value}
                    onChange={handleChange}
                    multiline
                    minRows={1}
                    maxRows={4}
                    variant="outlined"
                    placeholder="Type a message..."
                    sx={{
                        mt:1,
                        // fontSize: 16,
                        borderRadius: 2,
                        background: theme.palette.background.paper,
                    }}
                />
            </Box>
            <Box sx={{mt:1}}>
                <Button 
                    disabled={false}
                    onClick={handleSend} 
                    variant='outlined'
                    endIcon={<Icon icon="send" />}>
                        Send
                </Button>
            </Box>
        </Box>
    );
};

export default NewMessage;