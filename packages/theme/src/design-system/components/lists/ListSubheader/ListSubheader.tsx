'use client';

import { ListSubheader as MuiListSubheader } from '@mui/material';
import type { ListSubheaderProps } from './types';

export default function ListSubheader(props: ListSubheaderProps) {
	return <MuiListSubheader {...props} />;
}