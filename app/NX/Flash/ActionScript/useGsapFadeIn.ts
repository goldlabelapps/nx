import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Fades in a ref element over a duration with easing using GSAP.
 * @param duration Fade-in duration in seconds (default: 3)
 * @param ease Easing string (default: 'power2.out')
 * @returns ref to assign to the element
 */
export function useGsapFadeIn(duration: number = 3, ease: string = 'power2.out') {
    const ref = useRef<HTMLElement | null>(null);
    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(
                ref.current,
                { opacity: 0 },
                { opacity: 1, duration, ease }
            );
        }
    }, [duration, ease]);
    return ref;
}
