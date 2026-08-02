'use client';

import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from '../../types';

export const useDispatch: () => AppDispatch = useReduxDispatch;