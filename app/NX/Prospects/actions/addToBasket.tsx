import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects } from './setProspects';

export const addToBasket = (item: any): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => T_RootState) => {
        try {
            const current = getState().redux.prospects;
            const basket = Array.isArray(current?.basket) ? current.basket : [];
            const newBasket = [item, ...basket];
            dispatch(setProspects('basket', newBasket));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };