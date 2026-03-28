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
import { Button } from '@mui/material';
import { DesignSystem, Icon } from '../../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../../app/NX/Flash';
import { NXLogo, NXLogoAS } from '../clips';


export const NotFound: React.FC<{
    config?: any;
    is404?: boolean;
}> = ({ config, is404 }) => {

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

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (as.current && typeof as.current.destroy === 'function') {
                as.current.destroy();
            }
        };
    }, []);

    let svgSrc = "/nx/svg/NXLogo.svg";

    // if this is a 404 page log it out
    if (is404) {
        svgSrc = "/nx/svg/NXLogo404.svg";
        console.log('404 page detected');
    }

    return (
        <DesignSystem theme={theme}>
            <Flash id={'NotFound_flash'}>
                <MovieClip
                    id='mc_logo'
                    style={{ visibility: 'hidden' }}
                    offsetY={-50}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    <NXLogo ref={logoRef} svgSrc={svgSrc} />
                </MovieClip>

                <MovieClip
                    id='mc_home'
                    offsetY={50}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={800}>
                    <Button
                        fullWidth
                        sx={{ m: 1 }}
                        startIcon={<Icon icon="reset" />}
                        variant="outlined"
                        onClick={() => window.location.href = '/'}
                    >
                        Restart

                    </Button>

                    <Button
                        fullWidth
                        sx={{ m: 1 }}
                        startIcon={<Icon icon="admin" />}
                        variant="outlined"
                        onClick={() => window.location.href = '/nx-admin'}
                    >
                        NX Admin
                    </Button>
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
