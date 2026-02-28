"use client";
import React, { useRef, useEffect } from 'react';
import {
    Box,
} from '@mui/material';
import { DesignSystem } from '../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
} from '../../../app/NX/Flash';
import { Logo, LogoAS } from './Logo';
import {
    CleverText,
    DumbText,
    RequiredText,
    MenuClip,
} from './';

export const EchoPay: React.FC<{ config?: any }> = ({ config }) => {

    const theme = config?.cartridges?.designSystem?.themes?.light;
    const logoRef = useRef<HTMLImageElement>(null);
    const logoASRef = useRef<any>(null);

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
                    border
                    id='mc_chatbot'
                    offsetY={150}
                    style={{
                        visibility: 'hidden',
                        display: 'block',
                    }}
                    height={'100%'}
                    width={'80%'}
                    zIndex={150}>

                    <Box sx={{ border: '1px solid gold' }}>
                        <Box>
                            <DumbText options={{
                                id: 'dumb1',
                                markdown: "Hello. Please enter your company name to see how much you could save with EchoPay.",
                            }} />
                        </Box>
                        <Box>
                            <CleverText />
                        </Box>




                        {/* <Box>
                            <DumbText options={{
                                id: 'dumb1',
                                markdown: "Hello. Please enter your company name to see how much you could save with EchoPay.",
                            }} />
                        </Box>
                        <Box>
                            <RequiredText options={{
                                label: "Company Name",
                                helper: "eg: Pies Online Ltd",
                                type: 'string',
                                error: false,
                            }} />
                        </Box> */}
                    </Box>
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};
