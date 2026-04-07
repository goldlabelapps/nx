import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, searchProspects } from '../../Prospects';
import { setFeedback } from '../../DesignSystem';

async function patchJson(endpoint: string, body: any) {
    const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Failed to PATCH: ${endpoint}`);
    return res.json().catch(() => null);
}

export const hideProspect = (
    id: number,
    hide: boolean,
    successMessage: string = 'Prospect visibility updated',
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}prospects/${id}`;
            await patchJson(endpoint, { hide });
            dispatch(searchProspects());
            dispatch(setFeedback({ 
                severity: 'success',
                title: successMessage,
            }));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            dispatch(setProspects('error', msg));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
