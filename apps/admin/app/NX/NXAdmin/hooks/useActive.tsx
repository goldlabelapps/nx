"use client";
import { useSelector } from 'react-redux';

export function useActive() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.active);
  return slice;
}
