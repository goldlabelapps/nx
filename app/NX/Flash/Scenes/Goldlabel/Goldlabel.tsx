"use client";
import React from 'react';
import { useDispatch } from '../../../Uberedux';
import {
    Flash,
    MovieClip,
    useFlash,
    setFlash,
} from '../../../Flash';
import { GoldlabelAS } from './index';

export const Goldlabel: React.FC = () => {
    const flash = useFlash();
    const { started } = flash;
    const dispatch = useDispatch();
    const [replay, setReplay] = React.useState(0);

    React.useEffect(() => {
        if (!started) {
            dispatch(setFlash('scene', 'Goldlabel'));
            dispatch(setFlash('started', true));
        }
    }, [dispatch, started]);

    React.useEffect(() => {
        const logoAnimator = new GoldlabelAS(() => {
            dispatch(setFlash('finished', true));
        });
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
        <Flash id={'FlashDemo'}>

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

            <MovieClip id='mc_goldlabel' style={{ opacity: 1 }}>
                Goldlabel
            </MovieClip>

        </Flash>
    );
};

