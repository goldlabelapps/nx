'use client';

import { ListItem as MuiListItem } from '@mui/material';
import type { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';

export type ListItemProps = MuiListItemProps;

export default function ListItem(props: ListItemProps) {
	return <MuiListItem {...props} />;
}