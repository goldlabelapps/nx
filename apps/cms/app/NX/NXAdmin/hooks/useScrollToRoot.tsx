import { useEffect } from 'react';

export function useScrollToRoot(ref: React.RefObject<HTMLElement | null>, deps: any[] = []) {
    useEffect(() => {
        if (ref.current) {
            const target = ref.current.getBoundingClientRect().top + window.scrollY;
            const start = window.scrollY;
            const duration = 1200; // ms, adjust for slower/faster
            let startTime: number | null = null;

            function animateScroll(currentTime: number) {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;
                window.scrollTo(0, start + (target - start) * ease);
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }
            requestAnimationFrame(animateScroll);
        }
    }, deps);
}
