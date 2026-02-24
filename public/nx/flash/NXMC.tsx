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
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
import { NXLogo, NXLogoAS } from './NXLogo';

export const NXMC: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const [replay, setReplay] = React.useState(0);
    const logoRef = useRef<HTMLImageElement>(null);
    const as = useRef<any>(null);

    // HMR: force replay on module update (Next.js dev only)
    React.useEffect(() => {
        // @ts-ignore: HMR types are not in standard TS
        const mod = module as any;
        if (typeof mod !== 'undefined' && mod.hot) {
            const handler = () => setReplay(r => r + 1);
            mod.hot.addStatusHandler((status: string) => {
                if (status === 'apply') handler();
            });
            return () => {
                mod.hot.removeStatusHandler(handler);
            };
        }
    }, []);

    useEffect(() => {
        const onLogoDone = () => {
            console.log('Logo animation done');
        };
        as.current = new NXLogoAS(onLogoDone, logoRef);
        if (typeof window !== 'undefined') {
            (window as any).__logoASInstance = as.current;
        }
        as.current.init();
    }, [replay]);

    return (
        <DesignSystem theme={theme}>
            <Flash id={'NXMC_flash'}>
                <MovieClip
                    id='mc_logo'
                    style={{ visibility: 'hidden' }}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    <NXLogo ref={logoRef} />
                </MovieClip>
            </Flash>
        </DesignSystem>
    );
};
