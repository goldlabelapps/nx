import React from 'react';
import { IconButton, Box, Avatar } from '@mui/material';

import { useRouter } from 'next/navigation';
import { useAuthed } from '../../Paywall';


export default function User() {
    
    const authed = useAuthed();

    if (!authed) return null;

    return (<>
        <IconButton>
            <Avatar />
        </IconButton>
        </>
    );
}
