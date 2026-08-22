"use client";
import { useSelector } from 'react-redux';

export function useProspects() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.prospects);
  return slice;
}
