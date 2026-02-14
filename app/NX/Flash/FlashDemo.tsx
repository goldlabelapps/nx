"use client";
import React from 'react';
import { useDispatch } from '../Uberedux';
import { Flash, MovieClip, useFlash, setFlash } from '../Flash';

export const FlashDemo: React.FC = () => {
    const flash = useFlash();
    const { initted } = flash
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!initted) {
            dispatch(setFlash('initted', true));
        }
    }, [dispatch, initted]);

    return (
        <Flash id={'FlashDemo'}>
            <pre>
                {JSON.stringify(flash, null, 2)}
            </pre>
            <MovieClip id='mc_demo'>
                mc_demo
            </MovieClip>
        </Flash>
    );
};

export default FlashDemo;
