// import type { Dispatch } from 'redux';
// import { setUbereduxKey } from '../../Uberedux';
// import { addTerminalMessage, setEchoPay } from '../../EchoPay';
// import { setFeedback } from '../../DesignSystem';
// import { clearTerminal } from './clearTerminal';

// export const initPayment = (apiPayload: any): any =>
//     async (dispatch: Dispatch) => {
//         try {
//             dispatch(clearTerminal());
//             dispatch(addTerminalMessage('Initialising payment'));
//             dispatch(addTerminalMessage('Getting EchoPay API token...'));
//             // dispatch(setFeedback({
//             //     severity: 'success',
//             //     title: 'Getting EchoPay API token...',
//             // }));

//             const apiKey = process.env.NEXT_PUBLIC_ECHOPAY_APIKEY;
//             if (!apiKey) {
//                 dispatch(addTerminalMessage('EchoPay API key not found in config'));
//                 throw new Error('EchoPay API key not found in config');
//             }
//             const baseUrl = process.env.NEXT_PUBLIC_ECHOPAY_BASEURL;
//             const tokenRes = await fetch(`${baseUrl}/token`, {
//                 method: 'POST',
//                 headers: {
//                     'ep-api-key': apiKey,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             dispatch(addTerminalMessage('Response received. Parsing token ...'));

//             const tokenResponse = await tokenRes.json();
//             const status = tokenResponse?.status;
//             const statusCode = tokenResponse?.statusCode;
//             const idToken = tokenResponse?.data?.idToken || null;

//             dispatch(addTerminalMessage(`token: ${idToken}`));

//             if (status === 'success' && statusCode === 201 && idToken) {
//                 await dispatch(setEchoPay('token', idToken));
//             } else {
//                 await dispatch(setEchoPay('token', null));
//                 await dispatch(setFeedback({
//                     severity: 'error',
//                     title: 'EchoPay payment error',
//                     description: 'No token received',
//                 }));
//                 await dispatch(addTerminalMessage('Token retrieval failed'));
//                 return;
//             }

//             dispatch(addTerminalMessage('Requesting payment link...'));

//             const linkRes = await fetch(`${baseUrl}/links`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${idToken}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(apiPayload),
//             });
//             const linkResponse = await linkRes.json();
//             const linkStatus = linkResponse?.status;
//             const linkStatusCode = linkResponse?.statusCode;
//             const paymentLink = linkResponse?.data?.url || null;
//             if (linkStatus === 'success' && linkStatusCode === 201 && paymentLink) {
//                 dispatch(addTerminalMessage(`Payment link received: ${paymentLink}`));
//                 dispatch(setFeedback({
//                     severity: 'success',
//                     title: 'Redirecting to EchoPay...',
//                 }));
//                 setTimeout(() => {
//                     window.location.href = paymentLink;
//                 }, 1000);
//             } else {
//                 dispatch(addTerminalMessage('Failed to create payment link.'));
//                 dispatch(setFeedback({
//                     severity: 'error',
//                     title: 'EchoPay payment error',
//                     description: 'Could not create payment link.',
//                 }));
//             }
//         } catch (e: unknown) {
//             const msg = e instanceof Error ? e.message : String(e);
//             dispatch(setUbereduxKey({ key: 'error', value: msg }));
//             dispatch(addTerminalMessage(`EchoPay payment error: ${msg}`));
//             dispatch(setFeedback({
//                 severity: 'error',
//                 title: 'EchoPay payment error',
//                 description: msg,
//             }));
//         }
//     };
