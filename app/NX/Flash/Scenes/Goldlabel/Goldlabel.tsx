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
    Chatbot,
} from '../../../Flash';
import { LogoMC, LogoAS } from './LogoMC';
import { GoldlabelAS } from './';

export const Goldlabel: React.FC<{ config?: any }> = ({ config }) => {
    const defaultTheme = { mode: 'dark', primary: '#000', secondary: '#fff' }; // adjust as needed
    const theme = config?.cartridges?.designSystem?.themes?.dark ?? defaultTheme;
    const [replay, setReplay] = React.useState(0);
    const logoRef = useRef<HTMLImageElement>(null); // ref for LogoMC image
    const as = useRef<any>(null);
    const calculatorRef = useRef<HTMLDivElement>(null); // ref for calculator MovieClip DOM

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
            console.log('Logo animation done, now starting ChatbotAS');
        };
        as.current = new LogoAS(onLogoDone, logoRef);
        if (typeof window !== 'undefined') {
            (window as any).__logoASInstance = as.current;
        }
        as.current.init();
    }, [replay]);

    return (
        <DesignSystem theme={theme}>
            <Flash id={'goldlabel'}>
                <MovieClip
                    id='mc_logo'
                    style={{ visibility: 'hidden' }}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    <LogoMC ref={logoRef} />
                </MovieClip>

                <MovieClip
                    id='mc_calculator'
                    style={{ visibility: 'hidden' }}
                    width={'90%'}
                    maxWidth={600}
                    zIndex={200}
                    ref={calculatorRef}
                >
                    <Chatbot />
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
