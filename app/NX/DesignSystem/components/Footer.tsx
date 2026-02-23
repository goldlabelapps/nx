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
	lighten,
	darken,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { Icon, Nav } from '../../DesignSystem';
import { useFlash, setFlash } from '../../Flash';

import { EchoPayApp } from '../../../../public/echopay/flash'

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -8,
	left: 0,
	right: 0,
	margin: '0 auto',
});

export interface FooterProps {
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
}: FooterProps) {

	const flash = useFlash();
	const theme = useTheme();
	const dispatch = useDispatch();

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
					{flash?.scene && (
						<>
							<StyledFab
								color="primary" aria-label="cta"
								sx={{
									boxShadow: 0,
									border: `1px solid ${darken(theme.palette.divider, 0.5)}`,
									backgroundColor: lighten(theme.palette.background.default, 0.1),
								}}
								onClick={handleFabClick}
							>
								<Icon icon="flash" />
							</StyledFab>
							<EchoPayApp slug={flash.scene} />
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
