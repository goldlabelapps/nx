"use client";
import { T_Theme } from './NX/types';
import React from 'react';
import { NXMC } from '../public/nx/flash'
import { DesignSystem } from './NX/DesignSystem';
import config from '../public/nx/config.json';

export default function NotFound() {

    const theme = config?.cartridges?.designSystem?.themes?.['dark'];

    return <DesignSystem theme={theme as T_Theme}>
        <NXMC is404 />
    </DesignSystem>;
}
