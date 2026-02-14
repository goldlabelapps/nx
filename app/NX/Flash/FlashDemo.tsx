"use client";
import React from 'react';
import { Flash, MovieClip, Macromedia } from '../Flash';
import AnimateFlashLogo from './ActionScript/AnimateFlashLogo';

export const FlashDemo: React.FC = () => {
    React.useEffect(() => {
        // Initialize AnimateFlashLogo
        const logoAnimator = new AnimateFlashLogo('macromedia_icon');
        logoAnimator.init();
    }, []);

    // const fadeRef = useGsapFadeIn(3, 'power2.out');
    return (
        <Flash id={'FlashDemo'}>
            {/* <pre>
                {JSON.stringify(flash, null, 2)}
            </pre> */}
            <MovieClip id='macromedia_icon' style={{ opacity: 0 }}>
                <div
                    // ref={fadeRef as React.RefObject<HTMLDivElement>}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Macromedia width="100%" height="100%" />
                </div>
            </MovieClip>
        </Flash>
    );
};

export default FlashDemo;
