import { useSelector } from 'react-redux';


// Use this if your state shape is { redux: { ... } }
export function useAll() {
  const all = useSelector((state: any) => state.redux?.config);
  return {
    ...all,
  };
}
