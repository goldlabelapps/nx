'use client';
import type { T_Config } from '../types';
import * as React from 'react';



export interface I_Soho {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Soho({
    config,
}: I_Soho) {
    



    return (
        <>Hello world. </>
    );
}
