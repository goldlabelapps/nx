import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { addTerminalMessage, setEchoPay } from '../../EchoPay';
import { setFeedback } from '../../DesignSystem';

import { clearTerminal } from './clearTerminal';

export const initPayment = (): any =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(clearTerminal());
            dispatch(addTerminalMessage('Initialising payment'));
            dispatch(addTerminalMessage('Getting EchoPay API token...'));
            dispatch(setFeedback({
                severity: 'success',
                title: 'Initialising payment',
                description: 'Getting EchoPay API token...',
            }));

            // --- getToken logic inlined ---
            const apiKey = process.env.NEXT_PUBLIC_ECHOPAY_APIKEY;
            if (!apiKey) {
                dispatch(addTerminalMessage('EchoPay API key not found in config'));
                throw new Error('EchoPay API key not found in config');
            }
            const baseUrl = process.env.NEXT_PUBLIC_ECHOPAY_BASEURL;
            const tokenRes = await fetch(`${baseUrl}/token`, {
                method: 'POST',
                headers: {
                    'ep-api-key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            dispatch(addTerminalMessage('Response received. Parsing & saving to Redux...'));
            const tokenResponse = await tokenRes.json();
            const status = tokenResponse?.status;
            const statusCode = tokenResponse?.statusCode;
            const idToken = tokenResponse?.data?.idToken || null;
            if (status === 'success' && statusCode === 201 && idToken) {
                await dispatch(setEchoPay('token', idToken));
            } else {
                await dispatch(setEchoPay('token', null));
                await dispatch(setFeedback({
                    severity: 'error',
                    title: 'failed',
                    description: 'Token not received',
                }));
                await dispatch(addTerminalMessage('Token retrieval failed. Saved null token to echopay.'));
                return;
            }

            // --- getPaymentLink logic inlined ---
            dispatch(addTerminalMessage('Requesting payment link...'));
            const body = {
                hideUntilClicked: true,
                notification: 'api',
                amount: 100,
                reference: 'ORDER123',
                linkType: 'echopay',
                accountNumber: '1234',
            };
            const linkRes = await fetch(`${baseUrl}/links`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const linkResponse = await linkRes.json();
            const linkStatus = linkResponse?.status;
            const linkStatusCode = linkResponse?.statusCode;
            const paymentLink = linkResponse?.data?.url || null;
            if (linkStatus === 'success' && linkStatusCode === 201 && paymentLink) {
                dispatch(addTerminalMessage(`Payment link received: ${paymentLink}`));
                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Payment link created',
                    description: paymentLink,
                }));
            } else {
                dispatch(addTerminalMessage('Failed to create payment link.'));
                dispatch(setFeedback({
                    severity: 'error',
                    title: 'Payment link error',
                    description: 'Could not create payment link.',
                }));
            }
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            await dispatch(setUbereduxKey({ key: 'echopay', value: { token: null } }));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
            dispatch(addTerminalMessage(`Error during payment init: ${msg}`));
        }
    };
