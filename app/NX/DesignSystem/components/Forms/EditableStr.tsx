"use client";
import type { 
	T_Frontmatter,
} from '../../../types';

import * as React from 'react';
import { useRef, useEffect } from 'react';
import {
	Box,
	IconButton,
	Typography,
	TextField,
	Button,
	Collapse,
} from '@mui/material';
import { Icon } from '../../../DesignSystem';

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
	const [editing, setEditing] = React.useState(false);
	const [inputValue, setInputValue] = React.useState(value);
	const editRef = useRef<HTMLDivElement>(null);

	// Keep inputValue in sync if value prop changes
	React.useEffect(() => {
		setInputValue(value);
	}, [value]);

	// Click outside to cancel
	useEffect(() => {
		if (!editing) return;
		function handleClickOutside(event: MouseEvent) {
			if (editRef.current && !editRef.current.contains(event.target as Node)) {
				handleCancel();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editing]);

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSave = () => {
		if (onSave) {
			onSave(inputValue);
		}
		setEditing(false);
	};

	const handleCancel = () => {
		setInputValue(value);
		setEditing(false);
	};

	return (
		<Box id={id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
			{/* Display mode */}
			<Collapse in={!editing} orientation="horizontal" sx={{ display: editing ? 'none' : 'flex', alignItems: 'center', flex: 1 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }} onClick={handleEditClick} style={{ cursor: 'pointer' }}>
					<Typography variant='h6' sx={{ flex: 1 }}>{value}</Typography>
					<IconButton size='small' onClick={handleEditClick} aria-label="Edit">
						<Icon icon="edit" />
					</IconButton>
				</Box>
			</Collapse>

			{/* Edit mode */}
			<Collapse in={editing} orientation="horizontal" sx={{ display: editing ? 'flex' : 'none', alignItems: 'center', flex: 1 }}>
				<Box ref={editRef} sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: 1 }}>
					<TextField
						
						value={inputValue}
						onChange={handleInputChange}
						autoFocus
						sx={{ flex: 1 }}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSave();
							if (e.key === 'Escape') handleCancel();
						}}
					/>
					<IconButton
						
						color="primary"
						onClick={handleSave}
						aria-label="Save"
						sx={{ ml: 1 }}
						disabled={inputValue === value}
					>
						<Icon icon="save" />
					</IconButton>
					<IconButton  color="primary" onClick={handleCancel} aria-label="Cancel">
						<Icon icon="close" />
					</IconButton>
				</Box>
			</Collapse>
		</Box>
	);
}
