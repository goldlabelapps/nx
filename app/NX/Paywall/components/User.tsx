import React from 'react';
import { IconButton, Box, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAsync } from '../../Async';
import { useAuthed } from '../../Paywall';


export default function User() {
    
    const async = useAsync();
    const { ting } = async || {};
    const {avatar} = ting || {};
    if (!avatar) return null;
    return (<>
        <IconButton>
            <Avatar src={avatar} />
        </IconButton>
        </>
    );
}
