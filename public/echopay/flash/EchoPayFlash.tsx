"use client";
import React from 'react';
import { useDispatch } from '../../../app/NX/Uberedux';
import {
    Flash,
    MovieClip,
    useFlash,
    setFlash,
} from '../../../app/NX/Flash';
import { EchoPayAS, EchoPayIcon } from './';

export const EchoPayFlash: React.FC = () => {
    const flash = useFlash();
    const { started } = flash;
    const dispatch = useDispatch();
    const [replay, setReplay] = React.useState(0);
    const iconRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (!started) {
            dispatch(setFlash('scene', 'EchoPayFlash'));
            dispatch(setFlash('started', true));
        }
    }, [dispatch, started]);

    React.useEffect(() => {
        const logoAnimator = new EchoPayAS(() => {
            dispatch(setFlash('finished', true));
        }, iconRef);
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
        <Flash id={'echopay-flash'}>

            <MovieClip width={256} id='mc_echopay'>
                <EchoPayIcon ref={iconRef} />
            </MovieClip>

            <MovieClip
                id='pre'
                border={false}
                width={'100%'}
                height={'100%'}
                pos="top-left"
                align="left"
                style={{ opacity: 1 }}
            >
                <pre>
                    {JSON.stringify(flash, null, 2)}
                </pre>
            </MovieClip>

        </Flash>
    );
};

