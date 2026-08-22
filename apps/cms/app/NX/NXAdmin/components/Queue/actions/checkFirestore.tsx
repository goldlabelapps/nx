import type { Dispatch } from 'redux';
import { setQueue } from '../';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { setFeedback } from '../../../../DesignSystem';

/**
 * Checks the 'prospects' collection for a document with a matching fullname or linkedin key.
 * Dispatches a warning object if found, otherwise dispatches success.
 * Expects nxAdmin.prospect to have first_name, last_name, linkedin.
 */

export const checkFirestore = () =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            
            const nxAdmin = getState()?.redux?.nxAdmin || {};
            const data = nxAdmin?.queue?.table?.next;
            
            if (!data) {
                dispatch(setQueue('firebase', {
                    match: null,
                    doc: null,
                    id: null,
                }));
                return;
            }

            const db = getFirebaseFirestore();
            
            const fullname = `${data.first_name} ${data.last_name}`.trim();
            const linkedin = data.linkedin || '';
            
            const fullnameQuery = query(
                collection(db, 'prospects'),
                where('fullname', '==', fullname)
            );
            
            const linkedinQuery = linkedin
                ? query(collection(db, 'prospects'), where('linkedin', '==', linkedin))
                : null;

            const fullnameSnap = await getDocs(fullnameQuery);
            if (!fullnameSnap.empty) {
                dispatch(setQueue('firebase', {
                    match: 'fullname',
                    doc: fullnameSnap.docs[0].data(),
                    id: fullnameSnap.docs[0].id,
                }));
                return;
            }

            if (linkedinQuery) {
                const linkedinSnap = await getDocs(linkedinQuery);
                if (!linkedinSnap.empty) {
                    dispatch(setQueue('firebase', {
                        match: 'linkedin',
                        doc: linkedinSnap.docs[0].data(),
                        id: linkedinSnap.docs[0].id,
                    }));
                    return;
                }
            }

            dispatch(setQueue('firebase', {
                match: null,
                doc: null,
                id: null,
            }));

        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setQueue('error', msg));
            dispatch(setFeedback({
                title: `Firestore error`,
                description: msg,
                severity: 'info',
            }));
        }
    };
