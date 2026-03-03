"use client";
import React, { useRef, useEffect } from 'react';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
// import { EchoPayLogo, EchoPayLogoAS } from './EchoPayLogo';
import EchoPayLogo from './EchoPayLogo/EchoPayLogo'
import EchoPayLogoAS from './EchoPayLogo/EchoPayLogoAS';
import {
    NewCompany,
    GoViral,
    ShareThis,
} from './';
import { setFlash } from '../../../app/NX/Flash';
import { useDispatch } from '../../../app/NX/Uberedux';
import { Feedback } from '../../../app/NX/DesignSystem';

export const EchoPay: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const logoRef = useRef<HTMLImageElement>(null);
    const logoASRef = useRef<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        logoASRef.current =
            new EchoPayLogoAS(() => { }, logoRef);
    }, []);

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
            <GoViral />
            <Feedback />
            <Flash id={'NXMC_flash'}>
                <MovieClip
                    border
                    id='mc_chatbot'
                    style={{ visibility: 'hidden' }}
                    height={'100%'}
                    width={'95%'}
                    maxWidth={550}
                    zIndex={250}>
                    <>
                        <NewCompany options={{
                            id: 'newcompany_mc',
                            markdown: `Why switch card acquisition to **EchoPay**? Let's do the maths`,
                        }} />
                    </>
                </MovieClip>
                <MovieClip
                    id='mc_menu'
                    pos="bottom-middle"
                    style={{ visibility: 'hidden' }}
                    offsetY={-8}
                    width={'100%'}
                    height={50}
                    zIndex={200}>
                    <ShareThis />
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
                    <EchoPayLogo ref={logoRef} />
                </MovieClip>
            </Flash>
        </DesignSystem>
    );
};
