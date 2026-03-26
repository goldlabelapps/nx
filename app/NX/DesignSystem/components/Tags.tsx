'use client';
import React from "react";
import type { T_Config, T_Frontmatter } from '../../types';
import {
	useTheme,
	Box,
} from '@mui/material';
import TagsIcon from '@mui/icons-material/Tag';

export interface I_Tags {
	config: T_Config;
	frontmatter?: T_Frontmatter;
	related?: any[];
}

const Tags: React.FC<I_Tags> = ({ config, frontmatter }) => {
	const theme = useTheme();
	return (
		<Box>
			<TagsIcon
				sx={{
					fontSize: 16,
					verticalAlign: 'middle',
					mr: 0.5,
				}}
			/>
		</Box>
	);
};

export default Tags;
