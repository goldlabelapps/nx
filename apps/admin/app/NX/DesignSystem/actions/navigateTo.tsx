import type { T_UbereduxDispatch } from '../../types';
import { useRouter } from 'next/navigation';
import { setUbereduxKey } from '../../Uberedux';
import { setDesignSystem } from '../../DesignSystem';

export const navigateTo = (
    router: ReturnType<typeof useRouter>,
    url: string,
    target?: '_self' | '_blank',
): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const isBlank = (target || '_self') === '_blank';
            dispatch(setDesignSystem('loading', !isBlank));
            // Scroll viewport to top before navigation
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                // Check if navigating to the same page
                const currentUrl = window.location.pathname + window.location.search + window.location.hash;
                // Normalize both URLs for comparison (ignore trailing slashes)
                const normalize = (u: string) => u.replace(/\/$/, '');
                if (!isBlank && normalize(currentUrl) === normalize(url)) {
                    // Already on the same page, stop loading and do not navigate
                    dispatch(setDesignSystem('loading', false));
                    return;
                }
            }
            // Perform navigation
            if (typeof window !== 'undefined') {
                if (isBlank) {
                    window.open(url, '_blank');
                } else {
                    router.push(url);
                }
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
