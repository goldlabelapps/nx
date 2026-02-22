"use client";
import type { T_Config, T_Frontmatter, T_NavItem, I_NestedNav } from '../../types';
import * as React from 'react';
import Image from 'next/image';
import {
	useTheme,
	Box,
} from '@mui/material';
// import { Icon, Settings, Nav } from '../../DesignSystem';

export type T_Hero = {
	children?: React.ReactNode;
	config: T_Config;
	frontmatter?: T_Frontmatter;
	navItems?: T_NavItem[];
}

export default function Hero({
	children,
	config,
	frontmatter,
	navItems,
}: T_Hero) {

	const theme = useTheme();
	const aspectRatio = 1200 / 630;

	// const handleShowHero = () => {
	// 	console.log("handleShowHero");
	// };

	let src = null;
	if (frontmatter && frontmatter.image) {
		src = frontmatter.image;
	} else {
		console.log('No image value in frontmatter');
	}

	if (!src) return null;

	return (
		<Box sx={{
			borderRadius: 2,
			// border: `1px solid ${theme.palette.divider}`,
			mb: 2,

		}}
		>
			<Box
				sx={{
					width: '100%',
					height: 0,
					paddingBottom: `${100 / aspectRatio}%`,
					position: 'relative',
				}}
			>
				<Image
					src={src}
					alt={frontmatter?.title || 'Hero Image'}
					fill
					style={{
						objectFit: 'cover',
						borderRadius: '16px',
					}}
					sizes="(max-width: 900px) 100vw, 800px"
					priority
				/>
			</Box>
			{/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
				src: {JSON.stringify(src, null, 2)}
			</pre> */}
		</Box>
	);
}
