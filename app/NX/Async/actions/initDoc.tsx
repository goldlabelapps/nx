import type { T_UbereduxDispatch } from '../../types';
import { getFirebaseApp } from '../../lib/firebase';
import { setUbereduxKey } from '../../Uberedux';
import { setAsync } from '../../Async';
import { getFirebaseFirestore } from '../../lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export const initDoc = (): any =>
    async (dispatch: T_UbereduxDispatch, getState: () => any) => {
        try {
            const { ting } = getState().redux.async;
            const { uid, fingerprint } = ting || {};
            const firestore = getFirebaseFirestore();
            const asyncCol = collection(firestore, 'async');

            // Query for doc with matching fingerprint or uid
            let docId = null;
            let foundDoc = null;
            let foundUidDoc = null;
            let foundFingerprintDoc = null;
            if (fingerprint || uid) {
                const qFingerprint = query(asyncCol, where('fingerprint', '==', fingerprint));
                const qUid = uid ? query(asyncCol, where('uid', '==', uid)) : null;
                const [snapFingerprint, snapUid] = await Promise.all([
                    getDocs(qFingerprint),
                    qUid ? getDocs(qUid) : Promise.resolve({ docs: [] }),
                ]);
                if (snapUid && snapUid.docs.length > 0) {
                    foundUidDoc = snapUid.docs[0];
                }
                if (snapFingerprint.docs.length > 0) {
                    foundFingerprintDoc = snapFingerprint.docs[0];
                }
                // Prefer uid doc if both exist
                if (foundUidDoc) {
                    foundDoc = foundUidDoc;
                } else if (foundFingerprintDoc) {
                    foundDoc = foundFingerprintDoc;
                }
                if (foundDoc) {
                    docId = foundDoc.id;
                }
            }

            // If not found, create new doc
            if (!docId) {
                const newDoc = await addDoc(asyncCol, ting);
                docId = newDoc.id;
            }

            dispatch(setAsync('docId', docId));
            return docId;
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
