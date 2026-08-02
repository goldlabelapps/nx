'use client';

import { ListItemText as MuiListItemText } from '@mui/material';
import type { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';

export type ListItemTextProps = MuiListItemTextProps;

export default function ListItemText(props: ListItemTextProps) {
	return <MuiListItemText {...props} />;
}