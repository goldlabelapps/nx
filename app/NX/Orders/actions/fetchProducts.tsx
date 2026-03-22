import type { T_UbereduxDispatch, T_RootState } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setFeedback } from '../../DesignSystem';
import { setOrders } from '../../Orders';

export const fetchProducts = () => async (
    dispatch: T_UbereduxDispatch, 
    getState: () => T_RootState,
) => {
    try {
        const endpoint = `${process.env.NEXT_PUBLIC_NX_AI}products`;
        const res = await fetch(endpoint);
        const data = await res.json();
        // console.log('data', data?.data);
        if (data?.data){
            dispatch(setOrders('products', data.data));
        };
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(setFeedback({
            severity: 'error',
            title: 'Fetch Products Exception',
            description: msg,
        }));
    }
};
