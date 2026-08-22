"use client";

import { useEffect, useRef, useState } from 'react';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, query, limit, onSnapshot } from 'firebase/firestore';
import { useDispatch } from '@nx/uberedux';
import { setFeedback } from '../../../../DesignSystem';
import type { T_Post, T_PostStatus } from '../../../../types';

type T_UseSubscriptionOptions = {
  status?: T_PostStatus | null;
  categoryId?: string | null;
  tagId?: string | null;
};

export function useSubscription(maxDocs = 20, options: T_UseSubscriptionOptions = {}) {
  const { status = null, categoryId = null, tagId = null } = options;
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<T_Post[]>([]);
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  useEffect(() => {
    setLoading(true);
    const db = getFirebaseFirestore();
    const q = query(
      collection(db, 'posts'),
      limit(Math.max(maxDocs * 5, 50))
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const sorted = (snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as T_Post[])
        .filter((post) => (status ? post.status === status : post.status !== 'trash'))
        .filter((post) => !categoryId || (post.categoryIds ?? []).includes(categoryId))
        .filter((post) => !tagId || (post.tagIds ?? []).includes(tagId))
        .sort((a, b) => (
          new Date(b.updatedAt ?? b.createdAt).getTime()
          - new Date(a.updatedAt ?? a.createdAt).getTime()
        ))
        .slice(0, maxDocs);

      setPosts(sorted);
      setLoading(false);

      if (didInit.current) {
        dispatch(setFeedback({
          severity: 'info',
          title: 'Posts updated',
        }));
      } else {
        didInit.current = true;
      }
    });
    return () => unsub();
  }, [dispatch, maxDocs, status, categoryId, tagId]);

  return { posts, loading };
}
