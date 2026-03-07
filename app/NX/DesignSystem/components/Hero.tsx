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
		// console.log('No image for', frontmatter?.title);
	}

	if (!src) return null;
	// Open Graph aspect ratio: 1200x630
	const OG_WIDTH = 1200;
	const OG_HEIGHT = 630;
	// const OG_ASPECT_RATIO = OG_WIDTH / OG_HEIGHT;

	return (
		<Box sx={{
			mb: 3,
		}}>
			<Box
				sx={{
					width: '100%',
					maxWidth: `${OG_WIDTH}px`,
					aspectRatio: `${OG_WIDTH} / ${OG_HEIGHT}`,
					position: 'relative',
					margin: '0 auto',
				}}
			>
				<Image
					src={src}
					alt={frontmatter?.title || 'Hero Image'}
					fill
					style={{
						borderRadius: 8,
						objectFit: 'cover',
						width: '100%',
						height: '100%',
						aspectRatio: `${OG_WIDTH} / ${OG_HEIGHT}`,
						maxWidth: `${OG_WIDTH}px`,
						maxHeight: `${OG_HEIGHT}px`,
					}}
					sizes={`(max-width: 1200px) 100vw, ${OG_WIDTH}px`}
					priority
				/>
			</Box>

		</Box>
	);
}

/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
				src: {JSON.stringify(src, null, 2)}
			</pre> */