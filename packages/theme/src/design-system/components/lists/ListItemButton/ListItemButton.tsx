'use client';

import { ListItemButton as MuiListItemButton } from '@mui/material';
import type { ListItemButtonProps } from './types';

export default function ListItemButton(props: ListItemButtonProps) {
	return <MuiListItemButton {...props} />;
}