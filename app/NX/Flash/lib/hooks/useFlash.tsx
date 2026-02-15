"use client";
import { useSelector } from 'react-redux';
export function useFlash() {
  const slice = useSelector((state: any) => state.redux.flash);
  return {
    ...slice,
  };
}
