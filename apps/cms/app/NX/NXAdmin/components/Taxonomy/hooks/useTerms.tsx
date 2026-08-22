"use client";

import { useEffect, useState } from 'react';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import type { T_TaxonomyCollection } from '../types';

export function useTerms<T = any>(taxonomy: T_TaxonomyCollection) {
  const [terms, setTerms] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const db = getFirebaseFirestore();
    const q = query(collection(db, taxonomy), orderBy('name', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setTerms(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as T[]);
      setLoading(false);
    });
    return () => unsub();
  }, [taxonomy]);

  return { terms, loading };
}
