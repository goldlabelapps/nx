// /shared/svg/characters/biker.svg
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
    Chatbot,
    ChatbotAS,
} from '../../../app/NX/Flash';
import { NXLogo, NXLogoAS } from './NXLogo';

export const NXMC: React.FC<{ config?: any }> = ({ config }) => {
    const theme = config?.cartridges?.designSystem?.themes?.dark;
    const [replay, setReplay] = React.useState(0);
    const logoRef = useRef<HTMLImageElement>(null); // ref for LogoMC image
    const as = useRef<any>(null);
    const chatbotRef = useRef<HTMLDivElement>(null); // ref for chatbot MovieClip DOM

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
            console.log('Start Chatbot');
            // Initialize ChatbotAS with mc_chatbot (chatbotRef)
            if (chatbotRef.current) {
                const chatbotAS = new ChatbotAS(undefined, chatbotRef);
                if (typeof window !== 'undefined') {
                    (window as any).__chatbotASInstance = chatbotAS;
                }

                chatbotAS.init();
            }
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

                <MovieClip
                    id='mc_chatbot'
                    style={{ visibility: 'hidden' }}
                    width={'90%'}
                    maxWidth={600}
                    zIndex={200}
                    ref={chatbotRef}
                >
                    <Chatbot
                        title="NXMC"
                        logo={<NXLogo />}
                    />
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
