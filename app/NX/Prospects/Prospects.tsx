'use client';
import type { T_Config } from '../types';
import * as React from 'react';

export interface I_Prospects {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Prospects({
    config,
}: I_Prospects) {

    return (
        <>Prospects App </>
    );
}
