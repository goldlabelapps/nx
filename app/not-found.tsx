"use client";
import React from 'react';
import { T_Theme } from './NX/types';
import { NotFound as Clip404 } from '../public/nx/flash'
import { DesignSystem } from './NX/DesignSystem';
import config from '../public/nx/config.json';

export default function NotFound() {

    const theme = config?.cartridges?.designSystem?.themes?.['dark'];

    return <DesignSystem theme={theme as T_Theme}>

        <Clip404 />

        <div
            style={{
                zIndex: 1000,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >

            Oh no, bro.
        </div>
    </DesignSystem>;
}
