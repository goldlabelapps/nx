"use client";
import type { T_Config, T_Frontmatter, T_NavItem, I_NestedNav, T_Meta } from '../../types';
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
import { EchoPayApp } from '../../../../public/echopay/flash';
import { Virus } from '../../../NX/Virus'

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
	meta?: T_Meta;
}

export default function Footer({
	children,
	config,
	frontmatter,
	navItems,
	meta,
}: I_Footer) {

	const theme = useTheme();

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
					<Box sx={{ flexGrow: 1 }} />
					<Virus meta={meta as T_Meta} />
					<Nav
						mode="mobile"
						navItems={navItems as I_NestedNav["navItems"]}
						currentPath={frontmatter?.slug || '/'}
						config={config}
					/>
					<Box sx={{ flexGrow: 1 }} />
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
