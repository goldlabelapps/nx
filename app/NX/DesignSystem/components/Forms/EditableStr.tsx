"use client";
import type { 
	T_Frontmatter, 
	T_NavItem, 
	I_NestedNav, 
	T_Meta,
} from '../../../types';
import * as React from 'react';
import {
	Box,
} from '@mui/material';

export interface I_EditableStr {
	id: string;
	value?: string;
	onSave?: (newValue: string) => void;
}

export default function EditableStr({
	id,
	value = '',
	onSave,	
}: I_EditableStr) {

	
	return (
		<Box id={id} sx={{border: '1px solid red', p: 1}}>
			{value}
		</Box>
	);
}
