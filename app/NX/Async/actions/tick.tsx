import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync, timeHook } from '../../Async';
import {setFeedback, useFeedback} from '../../DesignSystem';
// import { militaryTime } from '../../lib';

export const TICKS_PER_PING = 10;

export const tick = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const { ticks } = getState().redux.async;
            // console.log('tick', ticks);
            const newTicks = ticks + 1;
            dispatch(setAsync('ticks', newTicks));
            if (newTicks === TICKS_PER_PING) {
                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Ping.',

                }));
                dispatch(setAsync('ticks', 0));
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
