"use client";
import React from 'react';
import { I_NX } from './types';

const NX: React.FC<I_NX> = ({
    children,
    config: _config,
}) => {
    return <>{children}</>;
};

export default NX;
