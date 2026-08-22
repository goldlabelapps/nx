"use client";
import { useSelector } from 'react-redux';

export function useNext() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.queue);
  if (slice?.table?.next) {
    return slice.table.next;
  }
  return null;
}
