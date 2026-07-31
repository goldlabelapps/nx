"use client";
import { useSelector } from 'react-redux';

export function useFilters() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.queue);
  if (slice?.table?.filters) {
    return slice.table.filters;
  }
  return null;
}
