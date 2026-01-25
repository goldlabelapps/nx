import { useSelector } from 'react-redux';
export function useEchopay() {
  const slice = useSelector((state: any) => state.redux.echopay);
  return {
    ...slice,
  };
}
