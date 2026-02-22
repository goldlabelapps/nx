"use client";
import type { T_Config, T_Frontmatter, T_NavItem, I_NestedNav } from '../../types';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import {
	useTheme,
	Toolbar,
} from '@mui/material';

import { Icon, Settings, Nav } from '../../DesignSystem'

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -8,
	left: 0,
	right: 0,
	margin: '0 auto',
});

interface FooterProps {
	children?: React.ReactNode;
	config: T_Config;
	frontmatter?: T_Frontmatter;
	navItems?: T_NavItem[];
}

export default function Footer({ children, config, frontmatter, navItems }: FooterProps) {
	const theme = useTheme();
	// const handleShowFooter = () => {
	// 	console.log("handleShowFooter");
	// };
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
					<StyledFab
						color="inherit" aria-label="cta"
						sx={{
							boxShadow: 0,
							border: `2px solid ${theme.palette.divider}`,
							backgroundColor: theme.palette.background.default,
						}}>
						<Icon icon="rocket" color={"primary"} />
					</StyledFab>
					<Box sx={{ flexGrow: 1 }} />

					{/* <IconButton onClick={handleShowFooter} color="primary">
						<Icon icon="down" />
					</IconButton> */}


					{/* <Settings
						config={config}
						frontmatter={frontmatter}
					/> */}


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
