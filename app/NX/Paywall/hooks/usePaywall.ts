import { useSelector } from 'react-redux';
export function usePaywall() {
  const slice = useSelector((state: any) => state.redux.paywall || {});
  return {
    ...slice,
  };
}
