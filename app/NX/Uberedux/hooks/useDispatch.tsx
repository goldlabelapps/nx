'use client';

import { useDispatch as useReduxDispatch } from 'react-redux';
import type { Dispatch } from 'redux';

export const useDispatch: () => Dispatch = useReduxDispatch;
