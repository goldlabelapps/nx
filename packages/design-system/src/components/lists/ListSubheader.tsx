'use client';

import { ListSubheader as MuiListSubheader } from '@mui/material';
import type { ListSubheaderProps as MuiListSubheaderProps } from '@mui/material/ListSubheader';

export type ListSubheaderProps = MuiListSubheaderProps;

export default function ListSubheader(props: ListSubheaderProps) {
	return <MuiListSubheader {...props} />;
}