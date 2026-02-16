"use client";
import React from 'react';
import { useDispatch } from '../../../../../app/NX/Uberedux';
import {
    Flash,
    MovieClip,
    useFlash,
    setFlash,
    Text,
} from '../../../../../app/NX/Flash';
import { CalculatorAS } from './';
import EchoPayLogo from '../../movieclips/EchoPayLogo';
import Variables from '../../movieclips/Variables';

export const Calculator: React.FC = () => {
    const flash = useFlash();
    // Safely select the text attribute, default to 'EchoPay NX'
    const textValue = (flash && typeof flash.text === 'string' && flash.text.trim() !== '') ? flash.text : 'EchoPay NX';
    const { started } = flash;
    const dispatch = useDispatch();
    const [replay, setReplay] = React.useState(0);
    const logoRef = React.useRef<any>(null);
    const textRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (!started) {
            // dispatch(setFlash('started', true));
            dispatch(setFlash('text', 'If your business is taking payment by card, this will calculate how much more money your business will make by simply switching to EchoPay for card enquiry'));
        }
    }, [dispatch, started]);

    React.useEffect(() => {
        const logoAnimator = new CalculatorAS(() => {
            // console.log('CalculatorAS callback');
            // dispatch(setFlash('finished', true));
        }, logoRef, textRef);
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
        <Flash id={'calculator'}>


            <MovieClip
                id='mc_logo'
                offsetY={-200}
                style={{ opacity: 0 }}
            >
                <EchoPayLogo ref={logoRef} />
            </MovieClip>


            <MovieClip
                id='mc_text'
                offsetY={-50}
                style={{ opacity: 0 }}
                width={400}
            >
                <Text ref={textRef}>
                    {textValue}
                </Text>
            </MovieClip>

            <MovieClip
                id='mc_card_turnover'
                // border
                offsetY={75}
                width={400}
                style={{ opacity: 1, zIndex: 2000 }}
            >
                <Variables />
            </MovieClip>

            <MovieClip
                id='pre'
                border={false}
                width={'100%'}
                height={'100%'}
                pos="top-left"
                align="left"
                style={{ opacity: 0 }}
            >
                <pre>
                    {JSON.stringify(flash, null, 2)}
                </pre>
            </MovieClip>

        </Flash>
    );
};

