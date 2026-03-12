"use client";
import React from "react";
// import { useRouter } from 'next/navigation';
import {
    ButtonBase,
    Tooltip,
    Typography,
} from '@mui/material';
import { Icon } from '../../DesignSystem'

export const Forward: React.FC<{
    options?: any;
}> = () => {

    // const router = useRouter();
    // const theme = useTheme();

    const handleClick = () => {
        console.log('Forward clicked.');
    };

    return (<ButtonBase onClick={handleClick} >
            <Icon icon="forward" color="primary" />
            <Typography variant="h6" sx={{ ml: 3 }}>    
                {'Send to friend'}
            </Typography>
        </ButtonBase>);
};

