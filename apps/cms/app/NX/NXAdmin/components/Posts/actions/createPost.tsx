import type { T_UbereduxDispatch, T_Post } from '../../../../types';
import { addDoc, collection } from 'firebase/firestore';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { createSlug } from '../../../../lib/vanilla-js/createSlug';
import { setFeedback } from '../../../../DesignSystem';

export type T_NewPostInput = Partial<T_Post> & { title: string };

export const createPost =
    (input: T_NewPostInput): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                const now = new Date().toISOString();
                const slug = input.slug || createSlug(input.title);

                const post: Omit<T_Post, 'id'> = {
                    title: input.title,
                    slug,
                    body: input.body ?? '',
                    excerpt: input.excerpt ?? '',
                    status: input.status ?? 'draft',
                    authorId: input.authorId ?? '',
                    featuredImage: input.featuredImage ?? null,
                    images: input.images ?? [],
                    categoryIds: input.categoryIds ?? [],
                    tagIds: input.tagIds ?? [],
                    seo: input.seo ?? {},
                    createdAt: now,
                    updatedAt: now,
                    publishedAt: input.status === 'published' ? now : null,
                    searchIndex: [input.title, input.excerpt]
                        .filter(Boolean)
                        .join(' ')
                        .toLowerCase(),
                };

                const db = getFirebaseFirestore();
                const docRef = await addDoc(collection(db, 'posts'), post);

                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Post created',
                }));

                return { id: docRef.id, ...post };
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return null;
            }
        };
