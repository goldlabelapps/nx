import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, searchProspects } from '../../Prospects';
import { setFeedback } from '../../DesignSystem';

// Helper for PATCH with JSON body and error handling
async function patchJson(endpoint: string, body?: any) {
    const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : JSON.stringify({}),
    });
    if (!res.ok) throw new Error(`Failed to PATCH: ${endpoint}`);
    return res.json().catch(() => null);
}

export const factoryReset = (
    successMessage: string = 'Factory Reset complete',
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}prospects/factoryreset`;
            dispatch(setProspects('resetting', true));
            const response = await patchJson(endpoint); // No body needed, endpoint will reset all
            // console.log('Factory Reset response:', response);
            await dispatch(searchProspects());
            dispatch(setFeedback({ 
                severity: 'success',
                title: successMessage,
            }));
            dispatch(setProspects('resetting', false));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            dispatch(setProspects('error', msg));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
