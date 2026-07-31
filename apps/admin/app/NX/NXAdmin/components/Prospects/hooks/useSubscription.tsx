"use client";

import { useEffect, useRef, useState } from 'react';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { createSlug } from '../../../../lib/vanilla-js/createSlug';
import { useDispatch } from '../../../../Uberedux';
import { setFeedback } from '../../../../DesignSystem';

type T_UseSubscriptionOptions = {
  tagSlug?: string | null;
};

export function useSubscription(maxDocs = 10, options: T_UseSubscriptionOptions = {}) {
  const { tagSlug = null } = options;
  const dispatch = useDispatch();
  const [prospects, setProspects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirebaseFirestore();
    const q = query(
      collection(db, 'prospects'),
      limit(Math.max(maxDocs * 5, 50))
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const normalizedTagSlug = tagSlug ? createSlug(tagSlug) : null;
      const sorted = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((doc: any) => !doc.trash)
        .filter((doc: any) => {
          if (!normalizedTagSlug) {
            return true;
          }

          if (!Array.isArray(doc.tags) || doc.tags.length === 0) {
            return false;
          }

          return doc.tags.some((tag: unknown) => createSlug(String(tag ?? '')) === normalizedTagSlug);
        })
        .sort((a: any, b: any) => (b.updated ?? b.created ?? 0) - (a.updated ?? a.created ?? 0))
        .slice(0, maxDocs);
      setProspects(sorted);
      setLoading(false);

      if (didInit.current) {
        dispatch(setFeedback({
          severity: 'info',
          title: 'Prospects updated',
        }));
      } else {
        didInit.current = true;
      }
    });
    return () => unsub();
  }, [dispatch, maxDocs, tagSlug]);

  return { prospects, loading };
}
