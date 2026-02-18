"use client";
import React from 'react';
import { useDispatch } from '../../../../../app/NX/Uberedux';
import { DesignSystem } from '../../../../../app/NX/DesignSystem';
import {
    Flash,
    MovieClip,
    useFlash,
    setFlash,
} from '../../../../../app/NX/Flash';
import { CalculatorAS } from './';
import EchoPayIcon from '../../movieclips/EchoPayIcon';
import Logo from '../../movieclips/Logo';
// import { exampleData } from './exampleData';

export const Calculator: React.FC<{ config?: any }> = ({ config }) => {
    const flash = useFlash();
    const { started } = flash;
    const dispatch = useDispatch();
    const [replay, setReplay] = React.useState(0);
    const iconRef = React.useRef<any>(null);
    const logoRef = React.useRef<any>(null);
    // const randomExample = exampleData[Math.floor(Math.random() * exampleData.length)];

    // Extract dark theme from config
    const darkTheme = config?.cartridges?.designSystem?.themes?.dark;

    React.useEffect(() => {
        if (!started) {
            dispatch(setFlash('started', true));
            // dispatch(setFlash('calculator', randomExample));
        }
    }, [dispatch, started]);

    React.useEffect(() => {
        const logoAnimator = new CalculatorAS(() => {
            console.log('CalculatorAS callback');
            // dispatch(setFlash('finished', true));
        }, iconRef, logoRef);
        logoAnimator.init();
    }, [replay, dispatch]);

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

    return (
        <DesignSystem theme={darkTheme}>
            <Flash id={'calculator'}>

                <MovieClip
                    id='mc_icon'
                    zIndex={20}
                    style={{ opacity: 0 }}
                >
                    <EchoPayIcon ref={iconRef} />
                </MovieClip>

                <MovieClip
                    id='mc_logo'
                    width={375}
                    style={{ opacity: 0 }}
                    zIndex={10}
                >
                    <Logo />
                </MovieClip>

            </Flash>
        </DesignSystem>
    );
};

