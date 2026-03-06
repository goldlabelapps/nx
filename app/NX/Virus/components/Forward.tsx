"use client";

import React from "react";
import type { T_Ad } from '../../types';
import { useRouter } from 'next/navigation';
import {
    useTheme,
    ButtonBase,
} from '@mui/material';
import { Icon } from '../../DesignSystem'

export const Forward: React.FC<{
    options?: any;
}> = () => {

    const router = useRouter();
    const theme = useTheme();

    const handleClick = () => {
        console.log('Forward clicked.');
    };

    return (
        <>
            <ButtonBase
                onClick={handleClick}
            >
                <Icon icon="forward" color="primary" />
            </ButtonBase>
        </>
    );
};
