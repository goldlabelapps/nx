import type { T_UbereduxDispatch, T_MediaItem } from '../../../../types';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setUbereduxKey } from '@nx/uberedux';
import { getFirebaseFirestore, getFirebaseStorage } from '../../../../lib/firebase';
import { setFeedback } from '../../../../DesignSystem';

export type T_UploadMediaInput = {
    file: File;
    uploadedBy: string;
    alt?: string;
    caption?: string;
    title?: string;
    description?: string;
    postId?: string | null;
};

export const uploadMedia =
    (input: T_UploadMediaInput): any =>
        async (dispatch: T_UbereduxDispatch) => {
            try {
                const { file, uploadedBy, alt = '', caption, title, description, postId = null } = input;
                const storagePath = `media/${Date.now()}-${file.name}`;

                const storage = getFirebaseStorage();
                const storageRef = ref(storage, storagePath);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);

                const mediaItem: Omit<T_MediaItem, 'id'> = {
                    url,
                    storagePath,
                    fileName: file.name,
                    mimeType: file.type,
                    size: file.size,
                    alt,
                    caption,
                    title,
                    description,
                    postId,
                    uploadedBy,
                    uploadedAt: new Date().toISOString(),
                };

                const db = getFirebaseFirestore();
                const docRef = await addDoc(collection(db, 'media'), mediaItem);

                dispatch(setFeedback({
                    severity: 'success',
                    title: 'Media uploaded',
                }));

                return { id: docRef.id, ...mediaItem };
            } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e);
                dispatch(setUbereduxKey({ key: 'error', value: msg }));
                return null;
            }
        };
