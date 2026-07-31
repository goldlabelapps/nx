"use client";
import { useSelector } from 'react-redux';

export function useNXAdmin() {
  const slice = useSelector((state: any) => state.redux.nxAdmin);
  return {
    ...slice,
  };
}
