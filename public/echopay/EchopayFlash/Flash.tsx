"use client";
import React from 'react';
// import { useDispatch } from '../../../app/NX/Uberedux';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
    // useFlash,
} from '../../../app/NX/Flash';
import { LogoMC } from './LogoMC';

export const EchoPayFlash: React.FC<{ config?: any }> = ({ config }) => {
    // const flash = useFlash();
    // const dispatch = useDispatch();
    // Extract dark theme from config
    const darkTheme = config?.cartridges?.designSystem?.themes?.dark;

    return (
        <DesignSystem theme={darkTheme}>
            <Flash id={'echopay_flash'}>
                <MovieClip
                    id='mc_logo'
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}
                    style={{ opacity: 1 }}>
                    logo
                </MovieClip>
            </Flash>
        </DesignSystem>
    );
};
