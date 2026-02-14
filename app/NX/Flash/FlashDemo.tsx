"use client";
import React from 'react';
import { useDispatch } from '../Uberedux';
import { Flash, MovieClip, useFlash, setFlash } from '../Flash';
import { useGsapFadeIn } from './actionscript/useGsapFadeIn';

export const FlashDemo: React.FC = () => {
    const flash = useFlash();
    const { initted } = flash
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!initted) {
            dispatch(setFlash('initted', true));
        }
    }, [dispatch, initted]);

    const fadeRef = useGsapFadeIn(3, 'power2.out');
    return (
        <Flash id={'FlashDemo'}>
            {/* <pre>
                {JSON.stringify(flash, null, 2)}
            </pre> */}
            <MovieClip id='mc_demo' style={{}}>
                <div
                    ref={fadeRef as React.RefObject<HTMLDivElement>}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                    }}
                >
                    Flash Demo
                </div>
            </MovieClip>
        </Flash>
    );
};

export default FlashDemo;
