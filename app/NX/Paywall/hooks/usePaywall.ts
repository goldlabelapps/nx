
import { useSelector } from 'react-redux';

export function usePaywall() {
  // Return the slice directly to avoid creating a new object reference
  return useSelector((state: any) => state.redux.paywall || {});
}
