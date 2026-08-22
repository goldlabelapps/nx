"use client";
import { useSelector } from 'react-redux';

export function useFingerprints() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.fingerprints);
  return slice;
}
