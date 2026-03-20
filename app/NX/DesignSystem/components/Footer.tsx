"use client";
import type { T_Frontmatter, T_NavItem, I_NestedNav, T_Meta } from '../../types';
import * as React from 'react';
import {
	useTheme,
	Toolbar,
	Box,
	AppBar,
	Container,
} from '@mui/material';
import {
	Nav,
} from '../../DesignSystem';

export interface I_Footer {
	children?: React.ReactNode;
	frontmatter?: T_Frontmatter;
	navItems?: T_NavItem[];
	meta?: T_Meta;
}

export default function Footer({
	children,
	frontmatter,
	navItems,
}: I_Footer) {

	const theme = useTheme();
	
	return (
		<React.Fragment>
			<AppBar
				position="fixed"
				color="default"
				sx={{
					background: theme.palette.background.default,
					boxShadow: 0, top: 'auto', bottom: 0
				}}>
				<Container maxWidth="lg">
					<Toolbar>
						<Box sx={{ flexGrow: 1 }} />
						{children}
						<Box sx={{ display: 'flex', }}>
							<Box sx={{ my: 1, mr: 0 }}>
								<Nav
									mode="mobile"
									navItems={navItems as I_NestedNav["navItems"]}
									frontmatter={frontmatter}
								/>
							</Box>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</React.Fragment>
	);
}
