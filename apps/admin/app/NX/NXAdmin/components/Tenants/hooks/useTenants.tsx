"use client";
import { useSelector } from 'react-redux';

export function useTenants() {
  const slice = useSelector((state: any) => state.redux.nxAdmin?.tenants);
  return slice;
}
