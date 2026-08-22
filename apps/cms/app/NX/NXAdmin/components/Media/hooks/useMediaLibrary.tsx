"use client";

import { useEffect, useState } from 'react';
import { getFirebaseFirestore } from '../../../../lib/firebase';
import { collection, query, limit, onSnapshot } from 'firebase/firestore';
import type { T_MediaItem } from '../../../../types';

type T_UseMediaLibraryOptions = {
  postId?: string | null;
};

export function useMediaLibrary(maxDocs = 50, options: T_UseMediaLibraryOptions = {}) {
  const { postId = null } = options;
  const [media, setMedia] = useState<T_MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const db = getFirebaseFirestore();
    const q = query(collection(db, 'media'), limit(Math.max(maxDocs * 5, 50)));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = (snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as T_MediaItem[])
        .filter((item) => !postId || item.postId === postId)
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .slice(0, maxDocs);

      setMedia(items);
      setLoading(false);
    });
    return () => unsub();
  }, [maxDocs, postId]);

  return { media, loading };
}
