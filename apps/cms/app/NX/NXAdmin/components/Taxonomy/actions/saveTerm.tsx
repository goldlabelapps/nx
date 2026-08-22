import type { T_UbereduxDispatch } from '../../../../types';
import { addDoc, doc, collection, updateDoc } from 'firebase/firestore';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { createSlug } from '../../../../lib/vanilla-js/createSlug';
import { setFeedback } from '../../../../DesignSystem';
import type { T_TaxonomyCollection } from '../types';

export type T_SaveTermInput = {
    id?: string;
    name: string;
    parentId?: string | null;
    description?: string;
};

// Creates or updates a category/tag term, deriving the slug from its name.
export const saveTerm =
    (taxonomy: T_TaxonomyCollection, input: T_SaveTermInput): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                const slug = createSlug(input.name);
                const db = getFirebaseFirestore();

                if (input.id) {
                    await updateDoc(doc(db, taxonomy, input.id), {
                        name: input.name,
                        slug,
                        ...(taxonomy === 'categories' ? { parentId: input.parentId ?? null } : {}),
                        description: input.description,
                    });
                    dispatch(setFeedback({ severity: 'success', title: 'Term updated' }));
                    return input.id;
                }

                const docRef = await addDoc(collection(db, taxonomy), {
                    name: input.name,
                    slug,
                    ...(taxonomy === 'categories' ? { parentId: input.parentId ?? null } : {}),
                    description: input.description,
                });
                dispatch(setFeedback({ severity: 'success', title: 'Term created' }));
                return docRef.id;
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return null;
            }
        };
