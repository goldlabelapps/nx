'use client';

import { ListItem as MuiListItem } from '@mui/material';
import type { ListItemProps } from './types';

export default function ListItem(props: ListItemProps) {
	return <MuiListItem {...props} />;
}