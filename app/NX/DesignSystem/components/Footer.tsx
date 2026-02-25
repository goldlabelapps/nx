"use client";
import type { T_Config, T_Frontmatter, T_NavItem, I_NestedNav } from '../../types';
import * as React from 'react';
import {
	useTheme,
	Toolbar,
	Box,
	styled,
	AppBar,
	Fab,
	darken,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { Icon, Nav } from '../../DesignSystem';
import { useFlash, setFlash } from '../../Flash';
// These Are the only two scenes we support for now, 
// if frontmatter.flash is set, it must be one of these
import { EchoPayApp } from '../../../../public/echopay/flash';
import { NXMCApp } from '../../../../public/nx/flash/';

const StyledFab = styled(Fab)(({ theme }) => ({
	position: 'absolute',
	zIndex: 1,
	top: 0,
	left: 0,
	right: 0,
	margin: '0 auto',
	'&:hover': {
		backgroundColor: darken(theme.palette.background.paper, 0.2),
		boxShadow: 0,
	},
}));

const validScenes = ['EchoPay', 'NXMC'];

export interface I_Footer {
	children?: React.ReactNode;
	config: T_Config;
	frontmatter?: T_Frontmatter;
	navItems?: T_NavItem[];
}

export default function Footer({
	children,
	config,
	frontmatter,
	navItems,
}: I_Footer) {

	const flashState = useFlash();
	const theme = useTheme();
	const dispatch = useDispatch();
	// Safely extract scene from frontmatter, avoid conflict with flashState
	const scene = frontmatter?.flash;

	// If scene is defined, it must be in validScenes, otherwise exit early

	// console.log('Footer scene:', scene);
	// console.log('validScenes.includes(scene)', validScenes.includes(scene as string));

	if (scene && !validScenes.includes(scene)) {
		return null;
	}

	const handleFabClick = () => {
		dispatch(setFlash("sceneOpen", true));
	};

	return (
		<React.Fragment>
			<AppBar
				position="fixed"
				sx={{
					background: theme.palette.background.default,
					boxShadow: 0,
					top: 'auto', bottom: 0
				}}
			>
				<Toolbar>
					{flashState?.scene && (
						<>
							<StyledFab
								color="primary" aria-label="cta"
								sx={{
									boxShadow: 0,
									backgroundColor: theme.palette.background.default,
								}}
								onClick={handleFabClick}
							>
								<Icon icon="flash" />
							</StyledFab>
							{scene === 'EchoPay' && <EchoPayApp slug={scene} />}
							{scene === 'NXMC' && <NXMCApp />}
						</>
					)}
					<Box sx={{ flexGrow: 1 }} />
					<Nav
						mode="mobile"
						navItems={navItems as I_NestedNav["navItems"]}
						currentPath={frontmatter?.slug || '/'}
						config={config}
					/>
					{children && (
						<Box sx={{ ml: 2 }}>
							{children}
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
