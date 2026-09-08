'use client';

import { List as MuiList } from '@mui/material';
import type { ListProps } from './types';

export default function List(props: ListProps) {
	return <MuiList {...props} />;
}
