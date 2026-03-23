import type { T_Feedback, T_UbereduxDispatch } from '../../types';
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
            // Scroll viewport to top before navigation
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }

            dispatch(setDesignSystem('loading', true));

            // console.log('navigateTo', url)
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
