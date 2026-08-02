'use client';

import { ListItemButton as MuiListItemButton } from '@mui/material';
import type { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';

export type ListItemButtonProps = MuiListItemButtonProps;

export default function ListItemButton(props: ListItemButtonProps) {
	return <MuiListItemButton {...props} />;
}