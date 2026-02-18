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
import Icon from '../../movieclips/Icon';
// import { exampleData } from './exampleData';
// import Result from '../../movieclips/Result';

export const Calculator: React.FC<{ config?: any }> = ({ config }) => {
    const flash = useFlash();
    const { started } = flash;
    const dispatch = useDispatch();
    const [replay, setReplay] = React.useState(0);
    const logoRef = React.useRef<any>(null);
    const resultRef = React.useRef<any>(null);
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
        }, logoRef, resultRef);
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
                    id='mc_logo'
                    zIndex={20}
                    style={{ opacity: 0 }}
                >
                    <Icon ref={logoRef} />
                </MovieClip>
                {/* <MovieClip
                    id='mc_result'
                    width={'100%'}
                    maxWidth={500}
                    style={{ opacity: 0 }}
                    zIndex={10}
                >
                    <Result />
                </MovieClip> */}
                <MovieClip
                    id='pre'
                    border={false}
                    width={'100%'}
                    height={'100%'}
                    pos="top-left"
                    align="left"
                    style={{ opacity: 0 }}
                    zIndex={1}
                >
                    <pre>
                        {JSON.stringify(flash, null, 2)}
                    </pre>
                </MovieClip>
            </Flash>
        </DesignSystem>
    );
};

