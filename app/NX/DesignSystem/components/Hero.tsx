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
		console.log('No image for', frontmatter?.title);
	}

	if (!src) return null;

	return (
		<Box sx={{
			mb: 3,
		}}>
			<Box
				sx={{
					width: '100%',
					height: '200px',
					position: 'relative',
				}}
			>
				<Image
					src={src}
					alt={frontmatter?.title || 'Hero Image'}
					fill
					style={{
						borderRadius: 8,
						objectFit: 'cover',
						maxHeight: '200px',
					}}
					sizes="(max-width: 900px) 100vw, 800px"
					priority
				/>
			</Box>

		</Box>
	);
}

/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
				src: {JSON.stringify(src, null, 2)}
			</pre> */