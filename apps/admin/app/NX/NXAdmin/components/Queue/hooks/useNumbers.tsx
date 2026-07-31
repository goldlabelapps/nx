"use client";
import { useSelector } from 'react-redux';

export function useNumbers() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.queue);
  const total = slice?.table?.total ?? 0;
  const filtered = slice?.table?.filtered ?? total;
  return { total, filtered };
}
