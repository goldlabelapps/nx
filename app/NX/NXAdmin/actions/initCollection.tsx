import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { getFirebaseApp } from '../../lib/firebase';
import { subscribeToCollectionDocs } from './firebaseCrudHelpers';


export const initCollection = (
    collection: string,
): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const newCRUD = {
                collection,
                initted: true,
                subscribed: true,
                mode: 'read',
                docs: [],
            };
            const state = getState();
            const currentNxAdmin = (state?.redux?.nxAdmin) || {};
            const currentCRUD = currentNxAdmin.crud || {};
            const updatedCRUD = { ...currentCRUD, [collection]: newCRUD };
            const updatedNxAdmin = { ...currentNxAdmin, crud: updatedCRUD };
            dispatch(setUbereduxKey({ key: 'nxAdmin', value: updatedNxAdmin }));

            // Subscribe to Firestore collection docs
            subscribeToCollectionDocs(collection, (docs) => {
                dispatch(setUbereduxKey({
                    key: 'nxAdmin',
                    value: {
                        ...getState().redux.nxAdmin,
                        crud: {
                            ...getState().redux.nxAdmin.crud,
                            [collection]: {
                                ...getState().redux.nxAdmin.crud[collection],
                                docs,
                            },
                        },
                    },
                }));
            });
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
