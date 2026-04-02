import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, searchProspects } from '../../Prospects';
import { setFeedback } from '../../DesignSystem';

// Helper for GET with JSON body and error handling
async function getJson(endpoint: string) {
    const res = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Failed to GET: ${endpoint}`);
    return res.json().catch(() => null);
}

export const fetchMarkdown = (
    slug: string,
    successMessage: string = 'Content fetched',
) =>
    async (dispatch: T_UbereduxDispatch) => {
        try {
            const endpoint = `/api/markdown/?slug=${encodeURIComponent(slug)}`;
            console.log('endpoint', endpoint);
            // await getJson(endpoint);
            // dispatch(searchProspects());
            // dispatch(setFeedback({
            //     severity: 'success',
            //     title: successMessage,
            // }));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            dispatch(setProspects('error', msg));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
