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
    GoViral,
} from './';
import { setFlash, useFlash } from '../../../app/NX/Flash';
import { useDispatch } from '../../../app/NX/Uberedux';
import { Feedback, setFeedback } from '../../../app/NX/DesignSystem';

export const EchoPay: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const logoRef = useRef<HTMLImageElement>(null);
    const logoASRef = useRef<any>(null);
    const flash = useFlash();
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

        // dispatch(setFeedback({
        //     severity: 'success',
        //     title: 'Hello!',
        // }));

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
                    <NewCompany options={{
                        id: 'newcompany_mc',
                        markdown: `Why switch your card acquisition to **EchoPay**? Let's do the maths`,
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
