"use client";
import type { T_Config, T_Frontmatter, T_NavItem } from '../../types';
import * as React from 'react';
import Image from 'next/image';
import {
	Box,
} from '@mui/material';

export type T_Hero = {
	children?: React.ReactNode;
	config: T_Config;
	frontmatter?: T_Frontmatter;
	navItems?: T_NavItem[];
}

export default function Hero({
	frontmatter,
}: T_Hero) {

	// const aspectRatio = 1200 / 630;


	let src = null;
	if (frontmatter && frontmatter.image) {
		src = frontmatter.image;
	}
	if (!src) return null;
	return (
		<Box sx={{
			my: 2,
		}}>
			<Box
				sx={{
					width: '100%',
					height: '275px',
					maxHeight: '275px',
					position: 'relative',
					overflow: 'hidden',
					borderRadius: 2,
				}}
			>
				<Image
					src={src}
					alt={frontmatter?.title || 'Hero Image'}
					fill
					style={{
						objectFit: 'cover',
						objectPosition: 'center',
						width: '100%',
						height: '100%',
					}}
					sizes="100vw"
					priority
				/>
			</Box>

		</Box>
	);
}
