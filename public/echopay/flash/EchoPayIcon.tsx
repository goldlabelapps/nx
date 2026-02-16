"use client";
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { TMovieClip } from '../../../app/NX/Flash/types';
import { useTheme } from '@mui/material';
import { gsap } from 'gsap';


// Forward ref to allow parent to trigger animation
const GoldlabelIcon = forwardRef(function GoldlabelIcon({ ...props }: TMovieClip, ref) {
    const theme = useTheme();
    const color = theme.palette.primary.main;
    const innerCircleRef = useRef<SVGGElement>(null);
    const outerCircleRef = useRef<SVGPathElement>(null);
    const arrowRef = useRef<SVGPolygonElement>(null);

    useImperativeHandle(ref, () => ({
        spinInnerCircle,
        spinOuterCircle,
        animateArrow,
    }));
    // Animate arrow in from the left
    function animateArrow(
        duration: number = 1,
        params: {
            onComplete?: () => void;
            [key: string]: any;
        } = {}
    ) {
        if (arrowRef.current) {
            const { onComplete, ...rest } = params;
            gsap.fromTo(
                arrowRef.current,
                { x: -200, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration,
                    ...rest,
                    onComplete: () => {
                        if (typeof onComplete === 'function') onComplete();
                    }
                }
            );
        }
    }


    // Animation functions
    function spinInnerCircle(
        duration: number = 1,
        params: {
            onComplete?: () => void;
            [key: string]: any;
        } = {}
    ) {
        if (innerCircleRef.current) {
            const { onComplete, ...rest } = params;
            gsap.to(innerCircleRef.current, {
                rotate: 360,
                transformOrigin: '50% 50%',
                duration,
                ...rest,
                onComplete: () => {
                    gsap.set(innerCircleRef.current, { rotate: 0 });
                    if (typeof onComplete === 'function') onComplete();
                }
            });
        }
    }

    function spinOuterCircle(
        duration: number = 1,
        params: {
            onComplete?: () => void;
            [key: string]: any;
        } = {}
    ) {
        if (outerCircleRef.current) {
            const { onComplete, ...rest } = params;
            gsap.to(outerCircleRef.current, {
                rotation: -720,
                transformOrigin: '50% 50%',
                duration,
                ...rest,
                onComplete: () => {
                    // gsap.set(outerCircleRef.current, { rotation: 0 });
                    if (typeof onComplete === 'function') onComplete();
                }
            });
        }
    }

    // Trigger animation on mount
    // No animation on mount; all must be triggered programmatically

    return (
        <svg width="512px" height="512px" viewBox="0 0 512 512">
            <g stroke="none" fill="none" fillRule="evenodd" strokeWidth="1">
                <g id="NXIcon" transform="translate(244.2421, 244.247)" fill={color}>
                    {/* Only this group (the inner circle) will spin */}
                    <g ref={innerCircleRef}>
                        <path d="M-0.547756378,99.9457082 C-51.5579953,97.5383911 -92.141613,55.4905862 -92.141613,3.81351306 C-92.141613,-49.3079504 -48.9914424,-92.4791699 4.10412076,-92.4791699 C55.7559979,-92.4791699 97.7833016,-51.8757552 100.189445,-0.840633286 L66.5034382,-10.951365 C59.9266464,-39.3577065 34.4215269,-60.3816089 4.10412076,-60.3816089 C-31.3463912,-60.3816089 -60.0597018,-31.6542918 -60.0597018,3.81351306 C-60.0597018,34.1457082 -39.0460499,59.6632692 -10.6535584,66.2432692 L-0.547756378,99.9457082 Z" fillRule="nonzero" transform="translate(8.1946, 7.8257) rotate(-224) translate(-8.1946, -7.8257)" />
                    </g>
                    {/* The outer circle will spin in the opposite direction */}
                    <path
                        ref={outerCircleRef}
                        d="M164.513677,3.81351306 C164.513677,8.6281472 164.353268,13.4427813 163.872039,18.2574155 L132.271356,8.78863501 C132.431766,7.18375696 132.431766,5.4183911 132.431766,3.81351306 C132.431766,-67.1220967 75.0051446,-124.576731 4.10412076,-124.576731 C-66.7969031,-124.576731 -124.223524,-67.1220967 -124.223524,3.81351306 C-124.223524,74.7491228 -66.7969031,132.203757 4.10412076,132.203757 C5.70821632,132.203757 7.47272144,132.203757 9.076817,132.043269 L18.5409808,163.659367 C13.7286941,164.14083 8.91640744,164.301318 4.10412076,164.301318 C-84.4419543,164.301318 -156.305436,92.4027813 -156.305436,3.81351306 C-156.305436,-84.7757552 -84.4419543,-156.674292 4.10412076,-156.674292 C92.6501958,-156.674292 164.513677,-84.7757552 164.513677,3.81351306 Z"
                        fillRule="nonzero"
                        transform="translate(8.1946, 7.8257) rotate(-224) translate(-8.1946, -7.8257)"
                    />
                    {/* Arrow animates in from the left */}
                    <polygon
                        ref={arrowRef}
                        id="arrow"
                        transform="translate(-105.242, 5.818) rotate(-224) translate(105.242, -5.818)"
                        points="-89.6020914 -10.0702968 -29.1276887 -30.2917602 -189.537245 -78.4381016 -141.414378 82.0497032 -121.202774 21.5458008 -52.7078935 90.0740935 -20.9468013 58.2975081"
                    />
                </g>
            </g>
        </svg>
    );
});

export default GoldlabelIcon;
