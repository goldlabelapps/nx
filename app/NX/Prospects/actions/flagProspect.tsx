import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, searchProspects } from '../../Prospects';
import { setFeedback } from '../../DesignSystem';

// Helper for PATCH with JSON body and error handling
async function patchJson(endpoint: string, body: any) {
    const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Failed to PATCH: ${endpoint}`);
    return res.json().catch(() => null);
}

export const flagProspect = (
    id: number,
    flag: boolean,
    successMessage: string = 'Prospect flag updated',
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}prospects/${id}`;
            dispatch(setProspects('flagging', true));
            await patchJson(endpoint, { flag });
            dispatch(searchProspects());
            dispatch(setFeedback({ 
                severity: 'success',
                title: successMessage,
            }));
            dispatch(setProspects('flagging', false));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            dispatch(setProspects('error', msg));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
