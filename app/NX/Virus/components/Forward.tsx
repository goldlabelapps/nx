"use client";
import React from "react";
// import { useRouter } from 'next/navigation';
import {
    ButtonBase,
    Tooltip,
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

    return (<Tooltip title="Send to a friend" placement="top">
        <ButtonBase
            onClick={handleClick}
        >
            <Icon icon="forward" color="primary" />
        </ButtonBase>
    </Tooltip>
    );
};

