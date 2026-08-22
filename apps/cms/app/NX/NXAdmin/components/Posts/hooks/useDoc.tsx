"use client";
import * as React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { usePost } from './usePost';

export function useDoc() {
    const postId = usePost();
    const [docValue, setDocValue] = React.useState<Record<string, unknown> | null>(null);

    React.useEffect(() => {
        if (!postId) {
            setDocValue(null);
            return;
        }

        const db = getFirebaseFirestore();
        const ref = doc(db, 'posts', postId);

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (!snapshot.exists()) {
                setDocValue(null);
                return;
            }

            setDocValue({ id: snapshot.id, ...snapshot.data() });
        });

        return unsubscribe;
    }, [postId]);

    return docValue;
}
