

import { useSelector } from 'react-redux';
import { selectPaywall } from './selectPaywall';

export function usePaywall() {
  // Use a memoized selector to avoid unnecessary re-renders
  return useSelector(selectPaywall);
}
