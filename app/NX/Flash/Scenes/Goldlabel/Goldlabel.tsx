"use client";
import React from 'react';
import { Flash, MovieClip, Macromedia, LightningBolt, useFlash, setFlash, AnimateFlashLogo } from '../../../Flash';
import { useDispatch } from '../../../Uberedux';

export const Goldlabel: React.FC = () => {
    const flash = useFlash();
    const { initted } = flash;
    const dispatch = useDispatch();
    const [replay, setReplay] = React.useState(0);

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

    React.useEffect(() => {
        // Initialize AnimateFlashLogo with onDone callback
        const logoAnimator = new AnimateFlashLogo('mc_macromedia', () => {
            dispatch(setFlash('finished', true));
        });
        logoAnimator.init();
    }, [replay, dispatch]);

    React.useEffect(() => {
        if (!initted) {
            dispatch(setFlash('started', true));
        }
    }, [dispatch, initted]);

    return (
        <Flash id={'FlashDemo'}>

            <MovieClip
                id='pre'
                border={false}
                width={400}
                height={350}
                pos="top-left"
                align="left"
                style={{ opacity: 0 }}>
                <pre>
                    {JSON.stringify(flash, null, 2)}
                </pre>
            </MovieClip>

            <MovieClip id='mc_macromedia' style={{ opacity: 0 }}>
                <Macromedia width="100%" height="100%" />
            </MovieClip>

            <MovieClip id='mc_lightningbolt' style={{ opacity: 0 }}>
                <LightningBolt width="100%" height="100%" />
            </MovieClip>


        </Flash>
    );
};

