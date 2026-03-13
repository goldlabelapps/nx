import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
// import { setAsync } from '../../Async';
// import { setFeedback, useFeedback } from '../../DesignSystem';
// import { militaryTime } from '../../lib';

export const every5 = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const { ticks } = getState().redux.async;
            // console.log('every5');
            
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
