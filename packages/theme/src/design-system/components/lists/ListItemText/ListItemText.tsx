'use client';

import { ListItemText as MuiListItemText } from '@mui/material';
import type { ListItemTextProps } from './types';

export default function ListItemText(props: ListItemTextProps) {
	return <MuiListItemText {...props} />;
}