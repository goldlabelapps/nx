import type { Dispatch } from 'redux';
import { fetchQueue, setQueue } from '../';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { setFeedback } from '../../../../DesignSystem';

export const finishJob = () =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const queue = getState()?.redux?.nxAdmin?.queue || {};
            if (queue?.saving) {
                return;
            }
            await dispatch(setQueue('saving', true));
            const proposedSaveDoc = queue?.proposedSaveDoc || null;
            const existingMatch = queue?.firebase || null;
            const nextQueueItem = queue?.table?.next || null;
            const queueItemId = nextQueueItem
                ? (
                    nextQueueItem.id
                    ?? nextQueueItem._id
                    ?? nextQueueItem.queue_id
                    ?? nextQueueItem.queueId
                    ?? null
                )
                : null;

            if (!proposedSaveDoc || typeof proposedSaveDoc !== 'object') {
                throw new Error('Missing proposedSaveDoc. Cannot save prospect.');
            }

            const firestore = getFirebaseFirestore();
            const now = Date.now();
            const fallbackAvatar = 'https://goldlabel.pro/shared/svg/blank.svg';
            const payload: Record<string, unknown> = {
                ...(proposedSaveDoc as Record<string, unknown>),
                source: {
                    ...((proposedSaveDoc as any)?.source || {}),
                    queueItemId,
                },
            };
            const queueEmail = typeof nextQueueItem?.email === 'string'
                ? nextQueueItem.email.trim()
                : null;
            payload.email = queueEmail;
            const avatarValue = payload.avatar;
            const normalizedAvatar = typeof avatarValue === 'string'
                ? (avatarValue.trim() ? avatarValue : fallbackAvatar)
                : (avatarValue == null ? fallbackAvatar : avatarValue);
            const baseUrl = process.env.NEXT_PUBLIC_PYTHON_URL || 'http://localhost:8000';
            const resetQueueState = async () => {
                await dispatch(setQueue('error', null));
                await dispatch(setQueue('pythonResponse', null));
                await dispatch(setQueue('proposedSaveDoc', null));
                await dispatch(setQueue('firebase', {
                    match: null,
                    doc: null,
                    id: null,
                }));
                await dispatch(setQueue('lastSavedProspectId', null));
            };
            const clearCurrentNextItem = async () => {
                const currentTable = getState()?.redux?.nxAdmin?.queue?.table || {};
                await dispatch(setQueue('table', {
                    ...currentTable,
                    next: null,
                }));
            };
            const deleteQueueItem = async () => {
                if (!queueItemId) return;
                const endpoint = `${baseUrl.replace(/\/$/, '')}/queue/delete?id=${encodeURIComponent(String(queueItemId))}`;
                const response = await fetch(endpoint, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error(`Python° queue delete failed: ${response.statusText}`);
                }
            };

            if (existingMatch?.match && existingMatch?.id) {
                const duplicateName = (
                    existingMatch?.doc?.fullname
                    || existingMatch?.doc?.fullName
                    || existingMatch?.doc?.full_name
                    || existingMatch?.doc?.name
                    || `${nextQueueItem?.first_name ?? ''} ${nextQueueItem?.last_name ?? ''}`.trim()
                    || 'This prospect'
                );
                await updateDoc(doc(firestore, 'prospects', existingMatch.id), {
                    ...payload,
                    avatar: normalizedAvatar,
                    updated: now,
                });
                await deleteQueueItem();
                await resetQueueState();
                await clearCurrentNextItem();
                await dispatch(fetchQueue());
                dispatch(setQueue('lastSavedProspectId', existingMatch.id));
                dispatch(setFeedback({
                    title: 'Prospect updated',
                    description: `${duplicateName} was updated in prospects.`,
                    severity: 'success',
                }));
                // console.log('finishJob updated', { docId: existingMatch.id, queueItemId });
                return;
            }

            const docRef = await addDoc(collection(firestore, 'prospects'), {
                ...payload,
                avatar: normalizedAvatar,
                created: now,
                updated: now,
            });
            await deleteQueueItem();
            await resetQueueState();
            await clearCurrentNextItem();
            await dispatch(fetchQueue());

            const savedName = (
                (payload as any)?.fullname
                || (payload as any)?.fullName
                || (payload as any)?.full_name
                || (payload as any)?.name
                || `${(payload as any)?.first_name ?? ''} ${(payload as any)?.last_name ?? ''}`.trim()
                || `${nextQueueItem?.first_name ?? ''} ${nextQueueItem?.last_name ?? ''}`.trim()
                || 'This prospect'
            );

            dispatch(setQueue('lastSavedProspectId', docRef.id));
            dispatch(setFeedback({
                title: `${savedName} saved`,
                // description: `Saved to prospects as ${docRef.id}`,
                severity: 'success',
            }));
            
            // save to prospects collection, then delete from python queue 
            // on success, reload the queue because the next record will have changed
            //console.log('finishJob saved', { docId: docRef.id, queueItemId });


            
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setQueue('error', msg));
            dispatch(setFeedback({
                title: `Firestore error`,
                description: msg,
                severity: 'info',
            }));
        } finally {
            await dispatch(setQueue('saving', false));
        }
    };
