"use client";
import * as React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { useProspect } from './useProspect';

export function useDoc() {
    const prospectId = useProspect();
    const [docValue, setDocValue] = React.useState<Record<string, unknown> | null>(null);

    React.useEffect(() => {
        if (!prospectId) {
            setDocValue(null);
            return;
        }

        const db = getFirebaseFirestore();
        const ref = doc(db, 'prospects', prospectId);

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (!snapshot.exists()) {
                setDocValue(null);
                return;
            }

            setDocValue({ id: snapshot.id, ...snapshot.data() });
        });

        return unsubscribe;
    }, [prospectId]);

    return docValue;
}
