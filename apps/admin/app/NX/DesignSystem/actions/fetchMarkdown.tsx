import type { T_UbereduxDispatch } from '../../types';
import { setUbereduxKey } from '../../Uberedux';
import { setFeedback } from '../../DesignSystem';
import { setDesignSystem } from './setDesignSystem';

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
    // successMessage: string = 'Content fetched',
) =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        // Insert or update the slug entry to loading: true if not already loading or loaded
        const current = getState().redux.designSystem || {};
        const markdownArr = Array.isArray(current.markdown) ? current.markdown : [];
        let entry = markdownArr.find((item: any) => item.slug === slug);
        if (!entry) {
            // Insert loading entry
            dispatch(setDesignSystem('markdown', [
                ...markdownArr,
                { slug, loading: true, error: null, data: null }
            ]));
        } else if (entry.loading || (entry.data && !entry.error)) {
            // Already loading or loaded successfully, do not fetch again
            return;
        } else {
            // Set loading true for retry
            dispatch(setDesignSystem('markdown', markdownArr.map((item: any) =>
                item.slug === slug ? { ...item, loading: true, error: null } : item
            )));
        }
        try {
            const endpoint = `/api/markdown/?slug=${encodeURIComponent(slug)}`;
            const contentObj = await getJson(endpoint);
            if (!contentObj) throw new Error('No content returned');
            // Update entry with data
            const updatedArr = (getState().redux.designSystem.markdown || []).map((item: any) =>
                item.slug === slug
                    ? { ...item, loading: false, error: null, data: contentObj }
                    : item
            );
            dispatch(setDesignSystem('markdown', updatedArr));
            // dispatch(setFeedback({
            //     severity: 'success',
            //     title: successMessage,
            // }));
        } catch (e) {
            let msg = e instanceof Error ? e.message : String(e);
            // Update entry with error
            const updatedArr = (getState().redux.designSystem.markdown || []).map((item: any) =>
                item.slug === slug
                    ? { ...item, loading: false, error: msg, data: null }
                    : item
            );
            dispatch(setDesignSystem('markdown', updatedArr));
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
