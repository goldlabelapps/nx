import type { Dispatch } from 'redux';
import { setUbereduxKey } from '../../Uberedux';
import { getFirebaseApp } from '../../lib/firebase';
import { fetchCollectionDocs, subscribeToCollectionDocs } from './firebaseCrudHelpers';

type InitCollectionOptions = {
    subscribe?: boolean;
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    searchTerm?: string;
};

const setCollectionState = (
    dispatch: Dispatch,
    getState: () => any,
    collection: string,
    docs: any[],
    typescript: any,
) => {
    dispatch(setUbereduxKey({
        key: 'nxAdmin',
        value: {
            ...getState().redux.nxAdmin,
            crud: {
                ...getState().redux.nxAdmin.crud,
                [collection]: {
                    ...getState().redux.nxAdmin.crud[collection],
                    docs,
                    typescript,
                },
            },
        },
    }));
};

export const initCollection = (
    collection: string,
    options: InitCollectionOptions = {},
): any =>
    async (dispatch: Dispatch, getState: () => any) => {
        try {
            const {
                subscribe = true,
                orderByField,
                orderDirection,
                searchTerm,
            } = options;
            const newCRUD = {
                collection,
                initted: true,
                subscribed: subscribe,
                orderByField: orderByField ?? null,
                orderDirection: orderDirection ?? null,
                searchTerm: searchTerm ?? '',
                mode: 'read',
                docs: [],
                typescript: {},
                selected: null
            };
            const state = getState();
            const currentNxAdmin = (state?.redux?.nxAdmin) || {};
            const currentCRUD = currentNxAdmin.crud || {};
            const updatedCRUD = { ...currentCRUD, [collection]: newCRUD };
            const updatedNxAdmin = { ...currentNxAdmin, crud: updatedCRUD };
            dispatch(setUbereduxKey({ key: 'nxAdmin', value: updatedNxAdmin }));

            if (!subscribe) {
                const { docs, typescript } = await fetchCollectionDocs(collection, {
                    orderByField,
                    orderDirection,
                    searchTerm,
                });
                setCollectionState(dispatch, getState, collection, docs, typescript);
                return;
            }

            // Subscribe to Firestore collection docs; return unsubscribe fn
            const unsubscribe = subscribeToCollectionDocs(collection, (docs, typescript) => {
                setCollectionState(dispatch, getState, collection, docs, typescript);
            }, {
                orderByField,
                orderDirection,
                searchTerm,
            });
            return unsubscribe;
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            dispatch(setUbereduxKey({ key: 'error', value: msg }));
        }
    };
