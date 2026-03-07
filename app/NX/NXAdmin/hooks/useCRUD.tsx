"use client";
import { useSelector } from 'react-redux';

export function useCRUD() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.crud);
  return {
    ...slice,
  };
}
