import { useSelector } from 'react-redux';

export function useSlice() {
  const slice = useSelector((state: any) => state.redux);

  return {
    ...slice,
  };
}
