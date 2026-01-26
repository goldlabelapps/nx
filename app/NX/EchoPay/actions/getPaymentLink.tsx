import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { addTerminalMessage } from '../../EchoPay'

export const getPaymentLink = async (dispatch: Dispatch): Promise<string | null> => {
    try {
        dispatch(addTerminalMessage('Getting payment link...'));
        // Get token from state
        const state = (dispatch as any).getState ? (dispatch as any).getState() : undefined;
        const token = state?.redux?.echopay?.token;
        if (!token) {
            dispatch(addTerminalMessage('No token found. Cannot get payment link.'));
            return null;
        }
        const baseUrl = process.env.NEXT_PUBLIC_ECHOPAY_BASEURL;
        const res = await fetch(`${baseUrl}/payment-link`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const response = await res.json();
        const status = response?.status;
        const statusCode = response?.statusCode;
        const paymentLink = response?.data?.paymentLink || null;
        if (status === 'success' && statusCode === 200 && paymentLink) {
            dispatch(addTerminalMessage(`Payment link: ${paymentLink}`));
        } else {
            dispatch(addTerminalMessage('Payment link not found or response status not success.'));
        }
        return paymentLink;
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
        dispatch(addTerminalMessage(`Error fetching payment link: ${msg}`));
        return null;
    }
};
