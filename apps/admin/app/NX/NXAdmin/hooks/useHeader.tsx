"use client";
import { useSelector } from 'react-redux';

export function useHeader() {
  const header = useSelector((state: any) => state?.redux?.nxAdmin?.header);
  return typeof header !== 'undefined' ? header : undefined;
}
