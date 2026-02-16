"use client";
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { TMovieClip } from '../../../../app/NX/Flash/types';
import { useTheme } from '@mui/material';
import { gsap } from 'gsap';

// Forward ref to allow parent to trigger animation

const Logo = forwardRef(function EchoPayIcon({ ...props }: TMovieClip, ref) {
    const theme = useTheme();
    const fill = theme.palette.primary.main;
    const logoRef = useRef<SVGPathElement>(null);

    // Expose fadeInLogo to parent
    useImperativeHandle(ref, () => ({
        fadeInLogo,
    }));

    // Animation: fade in with x-scale grow, snap back
    function fadeInLogo(
        duration: number = 1500,
        params: {
            onComplete?: () => void;
            [key: string]: any;
        } = {}
    ) {
        if (logoRef.current) {
            const { onComplete, ...rest } = params;
            // Start much smaller and scale up more
            gsap.fromTo(
                logoRef.current,
                {
                    opacity: 0,
                    scaleX: 0.01,
                    scaleY: 0.01,
                    transformOrigin: '50% 50%',
                },
                {
                    opacity: 1,
                    scaleX: 2.5,
                    scaleY: 1.5,
                    duration: duration * 0.7,
                    transformOrigin: '50% 50%',
                    ease: 'power4.out',
                    ...rest,
                    onComplete: () => {
                        gsap.to(logoRef.current, {
                            scaleX: 1,
                            scaleY: 1,
                            duration: duration * 0.3,
                            ease: 'elastic.out(1, 0.6)',
                            onComplete,
                        });
                    }
                }
            );
        }
    }

    return (
        <svg width="512px" height="512px" viewBox="0 0 512 512">
            <g id="logo" stroke="none" fill="none" fillRule="nonzero">
                <path
                    ref={logoRef}
                    d="M354.610827,440 L166.518764,440 C113.453684,440 89.8108272,415.291429 89.8108272,355.885714 L89.8108272,156.114286 C89.8108272,96.7085714 113.453684,72 166.518764,72 L354.610827,72 C420.28543,72 420.810827,125.097143 420.810827,151.908571 C420.810827,171.885714 420.28543,226.034286 354.610827,226.034286 L336.221938,226.034286 L336.221938,285.965714 L354.610827,285.965714 C420.28543,285.965714 420.810827,341.691429 420.810827,360.091429 C420.810827,385.325714 420.28543,440 354.610827,440 Z M354.610827,108.274286 L166.518764,108.274286 C137.621938,108.274286 126.063208,112.48 126.063208,156.114286 L126.063208,355.885714 C126.063208,399.52 137.621938,403.725714 166.518764,403.725714 L354.610827,403.725714 C379.829875,403.725714 384.558446,396.891429 384.558446,360.091429 C384.558446,318.034286 372.999716,322.24 332.544161,322.24 C324.137811,362.194286 299.969557,377.965714 255.836224,377.965714 C210.1267,377.965714 193.839399,325.92 224.312414,299.634286 C243.752097,283.337143 266.344161,285.965714 299.969557,285.965714 L299.969557,226.034286 L266.869557,226.034286 C189.636224,226.034286 193.314002,134.034286 255.836224,134.034286 C300.494954,134.034286 324.137811,149.805714 332.544161,189.76 L354.610827,189.76 C381.931462,189.76 384.558446,178.72 384.558446,151.908571 C384.558446,116.16 379.304478,108.274286 354.610827,108.274286 L354.610827,108.274286 Z M247.955272,327.497143 C242.175907,332.228571 243.752097,341.691429 255.836224,341.691429 C279.479081,341.691429 289.461621,338.537143 295.240986,322.24 C266.344161,322.24 255.836224,321.188571 247.955272,327.497143 L247.955272,327.497143 Z M255.836224,170.308571 C239.023526,170.308571 239.023526,189.76 266.869557,189.76 L295.240986,189.76 C289.461621,173.462857 279.479081,170.308571 255.836224,170.308571 Z"
                    id="echopay-logo"
                    fill={fill}
                />
            </g>
        </svg>
    );
});

export default Logo;
