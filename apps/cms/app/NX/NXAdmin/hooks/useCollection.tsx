"use client";
import { useSelector } from 'react-redux';

export function useCollection(collection: string) {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.crud);
  const collectionSlice = collection ? slice?.[collection] : undefined;
  return {
    ...(collection ? { [collection]: collectionSlice } : {}),
  };
}
