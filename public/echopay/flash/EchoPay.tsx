"use client";
import React, { useRef, useEffect } from 'react';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
import { Logo, LogoAS } from './Logo';
import {
    NewCompany,
    MenuClip,
} from './';
import { setFlash, useFlash } from '../../../app/NX/Flash';
import { useDispatch } from '../../../app/NX/Uberedux';

export const EchoPay: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const logoRef = useRef<HTMLImageElement>(null);
    const logoASRef = useRef<any>(null);
    const dispatch = useDispatch();
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
    }, [logoASRef]);

    useEffect(() => {
        dispatch(setFlash('thisStep', {
            num: 1,
            description: 'Setup Chatbot',
        }));
    }, [dispatch]);

    return (
        <DesignSystem theme={theme}>
            <Flash id={'NXMC_flash'}>
                <MovieClip
                    border
                    id='mc_chatbot'
                    style={{ visibility: 'hidden' }}
                    height={'100%'}
                    width={'90%'}
                    minWidth={320}
                    maxWidth={500}
                    zIndex={250}>
                    {/* markdown: `Add a new company to see how much more profit it would
                        make by switching card acuisition to **EchoPay**`, */}

                    {/* markdown: `Why switch card acquisition to **EchoPay**?`, */}
                    <NewCompany options={{
                        id: 'newcompany_mc',
                        markdown: `How much more profit is made by plugging in **EchoPay** card acquisition? Do the maths`,
                    }} />
                </MovieClip>
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
            </Flash>
        </DesignSystem>
    );
};
