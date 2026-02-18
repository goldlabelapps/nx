"use client";
import React from 'react';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
import { LogoMC } from './LogoMC';

export const EchoPayFlash: React.FC<{ config?: any }> = ({ config }) => {
    const theme = config?.cartridges?.designSystem?.themes?.dark;
    return (
        <DesignSystem theme={theme}>
            <Flash id={'echopay_flash'}>
                <MovieClip
                    id='mc_logo'
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    <LogoMC />
                </MovieClip>
            </Flash>
        </DesignSystem>
    );
};
