import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export function usePaywall() {
  const slice = useSelector((state: any) => state.redux.paywall || {});
  // Memoize the returned object to avoid unnecessary rerenders
  return useMemo(() => ({ ...slice }), [slice]);
}
