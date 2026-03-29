'use client';

import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

export const useDispatch: () => AppDispatch = useReduxDispatch;
