'use client';
import type { T_Config } from '../types';
import * as React from 'react';

export interface I_Tings {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Tings({
    config,
}: I_Tings) {

    return (
        <>Tings App </>
    );
}
