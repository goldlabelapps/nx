// TypeScript: declare import.meta.hot for Vite/webpack HMR
declare global {
    interface ImportMeta {
        hot?: {
            accept: (cb: () => void) => void;
        };
    }
}
"use client";

import React, { useRef, useEffect } from 'react';
import { DesignSystem } from '../../../DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../Flash';

export const NXMC: React.FC<{ config?: any }> = ({ config }) => {
    const theme = config?.cartridges?.designSystem?.themes?.dark;
    // const [replay, setReplay] = React.useState(0);
    // const logoRef = useRef<HTMLImageElement>(null); // ref for LogoMC image
    // const as = useRef<any>(null);
    const calculatorRef = useRef<HTMLDivElement>(null); // ref for calculator MovieClip DOM

    // HMR: force replay on module update (Next.js dev only)
    React.useEffect(() => {
        // @ts-ignore: HMR types are not in standard TS
        const mod = module as any;
        if (typeof mod !== 'undefined' && mod.hot) {
            // const handler = () => setReplay(r => r + 1);
            mod.hot.addStatusHandler((status: string) => {
                // if (status === 'apply') handler();
            });
            return () => {
                // mod.hot.removeStatusHandler(handler);
            };
        }
    }, []);


    return (
        <DesignSystem theme={theme}>
            <Flash id={'echopay_flash'}>
                <MovieClip
                    id='mc_logo'
                    style={{ visibility: 'hidden' }}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    NX
                </MovieClip>

                <MovieClip
                    id='mc_calculator'
                    style={{ visibility: 'hidden' }}
                    width={'90%'}
                    maxWidth={600}
                    zIndex={200}
                    ref={calculatorRef}
                >
                    MC
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
