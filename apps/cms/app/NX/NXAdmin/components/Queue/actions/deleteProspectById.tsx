import type { Dispatch } from 'redux';
import { doc, deleteDoc } from 'firebase/firestore';
import { setFeedback } from '../../../../DesignSystem';
import { initCollection } from '../../../actions/initCollection';
import { getFirebaseFirestore } from '../../../../lib/firebase';

export const deleteProspectById = (prospectId: string) =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const firestore = getFirebaseFirestore();
            await deleteDoc(doc(firestore, 'prospects', prospectId));

            const prospectsState = getState()?.redux?.nxAdmin?.crud?.prospects || {};
            await dispatch(initCollection('prospects', {
                subscribe: false,
                orderByField: prospectsState.orderByField || 'created',
                orderDirection: prospectsState.orderDirection || 'desc',
                searchTerm: prospectsState.searchTerm || '',
            }));

            dispatch(setFeedback({
                title: 'Prospect deleted',
                description: `Deleted prospect ${prospectId}`,
                severity: 'success',
            }));
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setFeedback({
                title: 'Delete failed',
                description: msg,
                severity: 'error',
            }));
            throw e;
        }
    };