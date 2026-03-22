'use client';
import type { T_Config } from '../types';
import * as React from 'react';

export interface I_Orders {
    config: T_Config;
    children?: React.ReactNode;
};

export default function Orders({
    config,
}: I_Orders) {

    return (
        <>Orders App </>
    );
}
