"use client";
import React, { useRef, useEffect } from 'react';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
import { Logo, LogoAS } from './Logo';
import { CleverText } from './CleverText';
import { MenuClip } from './MenuClip';

export const EchoPay: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const logoRef = useRef<HTMLImageElement>(null);
    const logoASRef = useRef<any>(null);
    const cleverTextRef = useRef<HTMLImageElement>(null);

    const onDone = (flag: string | null) => {
    };

    useEffect(() => {
        logoASRef.current =
            new LogoAS(() => onDone('LogoDone'), logoRef);
    }, [onDone]);

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
                    pos="bottom-middle"
                    style={{ visibility: 'hidden' }}
                    offsetY={-8}
                    width={50}
                    height={50}
                    zIndex={200}>
                    <MenuClip />
                </MovieClip>

                <MovieClip
                    id='mc_logo'
                    pos="top-middle"
                    offsetY={32}
                    style={{ visibility: 'hidden' }}
                    width={300}
                    height={100}
                    maxWidth={'90%'}
                    zIndex={100}>
                    <Logo ref={logoRef} />
                </MovieClip>

                <MovieClip
                    id='mc_clevertext'
                    align='left'
                    offsetY={50}
                    style={{ visibility: 'hidden' }}
                    height={'70%'}
                    width={'80%'}
                    maxWidth={500}
                    zIndex={150}>
                    <CleverText />
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
