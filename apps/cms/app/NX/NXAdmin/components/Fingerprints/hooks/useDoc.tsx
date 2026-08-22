"use client";
import * as React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { useFingerprint } from './useFingerprint';

export function useDoc() {
    const fingerprintId = useFingerprint();
    const [docValue, setDocValue] = React.useState<Record<string, unknown> | null>(null);

    React.useEffect(() => {
        if (!fingerprintId) {
            setDocValue(null);
            return;
        }

        const db = getFirebaseFirestore();
        const ref = doc(db, 'fingerprints', fingerprintId);

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (!snapshot.exists()) {
                setDocValue(null);
                return;
            }

            setDocValue({ id: snapshot.id, ...snapshot.data() });
        });

        return unsubscribe;
    }, [fingerprintId]);

    return docValue;
}