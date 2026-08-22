"use client";
import { useSelector } from 'react-redux';

export function usePosts() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.posts);
  return slice;
}
