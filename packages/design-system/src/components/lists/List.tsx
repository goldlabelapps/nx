'use client';

import { List as MuiList } from '@mui/material';
import type { ListProps as MuiListProps } from '@mui/material/List';

export type ListProps = MuiListProps;

export default function List(props: ListProps) {
	return <MuiList {...props} />;
}
