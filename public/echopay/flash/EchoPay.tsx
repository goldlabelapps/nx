"use client";
import React, { useRef, useEffect } from 'react';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
import { Logo, LogoAS } from './Logo';
import { CleverText, CleverTextAS } from './CleverText';
import { MenuClip } from './MenuClip';

export const EchoPay: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const logoRef = useRef<HTMLImageElement>(null);
    const logoASRef = useRef<any>(null);
    const cleverTextRef = useRef<HTMLImageElement>(null);
    const cleverTextASRef = useRef<any>(null);

    const effectHook = (flag: string | null) => {
        if (flag === 'LogoDone') {
            // cleverTextASRef.current =
            //     new CleverTextAS(() => effectHook('CleverTextDone'), cleverTextRef);
            // cleverTextASRef.current.init();
            // logoASRef.current.fadeOut();
        }
    };

    useEffect(() => {
        logoASRef.current =
            new LogoAS(() => effectHook('LogoDone'), logoRef);
    }, [effectHook]);

    useEffect(() => {
        if (logoASRef.current) {
            logoASRef.current.init();
            logoASRef.current.echoText();
        }

    }, []);

    return (
        <DesignSystem theme={theme}>
            <Flash id={'NXMC_flash'}>

                <MovieClip
                    id='mc_menu'
                    pos="bottom-left"
                    style={{ visibility: 'hidden' }}
                    width={50}
                    height={50}
                    zIndex={200}>
                    <MenuClip />
                </MovieClip>

                <MovieClip
                    border
                    id='mc_logo'
                    style={{ visibility: 'hidden' }}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    <Logo ref={logoRef} />
                </MovieClip>

                <MovieClip
                    scrollable
                    id='mc_clevertext'
                    style={{ visibility: 'hidden' }}
                    height={'50vh'}
                    width={400}
                    maxWidth={'90%'}
                    zIndex={150}>
                    <CleverText ref={cleverTextRef} />
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
