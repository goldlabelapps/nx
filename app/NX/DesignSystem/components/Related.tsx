'use client';
import React from "react";
import { useRouter } from 'next/navigation';
// import type { T_Config, T_Frontmatter } from '../../types';
import {
	useTheme,
	Box,
	Button,
} from '@mui/material';
import { Icon, navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface I_Related {
	related?: any[];
}

const Related: React.FC<I_Related> = ({ related }) => {
	
	const dispatch = useDispatch();
	const router = useRouter();

	const handleTagsClick = () => {
		dispatch(navigateTo(router, `/tags`));
	};

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
