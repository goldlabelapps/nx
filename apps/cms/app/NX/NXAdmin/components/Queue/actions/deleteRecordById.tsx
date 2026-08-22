import type { Dispatch } from 'redux';
import { fetchQueue, setQueue } from '../';
import { setFeedback } from '../../../../DesignSystem';

/**
 * Delete a prospect record from Python by ID.
 * After deletion, resets queue state and reloads the queue.
 * Preserves the autoqueue flag so the auto workflow keeps rolling.
 */
export const deleteRecordById = (recordId: number | string) =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_PYTHON_URL || 'http://localhost:8000';
            const endpoint = `${baseUrl.replace(/\/$/, '')}/queue/delete?id=${encodeURIComponent(String(recordId))}`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete record ${recordId}: ${response.statusText}`);
            }

            const data = await response.json();

            // Preserve autoqueue before resetting state
            const autoqueue = getState()?.redux?.nxAdmin?.queue?.autoqueue
                ?? getState()?.redux?.nxAdmin?.queue?.autoQueue
                ?? false;

            await dispatch(setQueue('error', null));
            await dispatch(setQueue('pythonResponse', null));
            await dispatch(setQueue('proposedSaveDoc', null));
            await dispatch(setQueue('firebase', { match: null, doc: null, id: null }));
            await dispatch(setQueue('lastSavedProspectId', null));
            await dispatch(setQueue('table', { ...getState()?.redux?.nxAdmin?.queue?.table, next: null }));
            await dispatch(setQueue('autoqueue', autoqueue));

            await dispatch(fetchQueue());

            dispatch(setFeedback({
                title: `Record deleted`,
                description: `Deleted record ID ${recordId}`,
                severity: 'success',
            }));

            return data;
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setFeedback({
                title: `Delete failed`,
                description: msg,
                severity: 'error',
            }));
            await dispatch(setQueue('error', msg));
            throw e;
        }
    };
