"use client";
import { useSelector } from 'react-redux';

export function useAccount() {
  const slice = useSelector((state: any) => state.redux.paywall?.account);
  return slice;
}
