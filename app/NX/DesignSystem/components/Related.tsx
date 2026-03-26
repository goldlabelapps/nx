'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import {
	Box,
	Button,
} from '@mui/material';
import { Icon, navigateTo, setFeedback } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface I_Related {
	related?: any[];
}

const Related: React.FC<I_Related> = ({ related }) => {
	
	const dispatch = useDispatch();
	const router = useRouter();

	const handleTagsClick = () => {
		dispatch(setFeedback({
			severity: 'success',
			title: 'Tags coming soon'
		}));
		// dispatch(navigateTo(router, `/tags`));
	};
	return null
	return (
		<Box>
			<Button 
				onClick={handleTagsClick}
				startIcon={<Icon icon="tag" />}
				variant="text">
				Tags
			</Button>
		</Box>
	);
};

export default Related;
