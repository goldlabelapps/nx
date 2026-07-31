"use client";

import { useEffect, useRef, useState } from 'react';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useDispatch } from '../../../../Uberedux';
import { setFeedback } from '../../../../DesignSystem';

export function useSubscription(pageSize = 5, page = 1, setTotal?: (n: number) => void) {
  const dispatch = useDispatch();
  const [fingerprints, setFingerprints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirebaseFirestore();

    // Query all docs ordered by 'updated' (no filters, no pagination)
    const q = query(
      collection(db, 'fingerprints'),
      orderBy('updated', 'desc')
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFingerprints(docs);
      setLoading(false);

      if (didInit.current) {
        dispatch(setFeedback({
          severity: 'info',
          title: 'Fingerprints updated',
        }));
      } else {
        didInit.current = true;
      }
    });
    return () => {
      unsub();
    };
  }, [dispatch]);

  return { fingerprints, loading };
}
