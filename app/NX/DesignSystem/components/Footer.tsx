"use client";
import type { T_Frontmatter, T_NavItem, I_NestedNav, T_Meta } from '../../types';
import * as React from 'react';
import {
	useTheme,
	Toolbar,
	Box,
	AppBar,
} from '@mui/material';
import { NXAdmin } from '../../NXAdmin';
import { Nav } from '../../DesignSystem';
import { Virus } from '../../../NX/Virus'

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
	meta,
}: I_Footer) {

	const theme = useTheme();

	return (
		<React.Fragment>
			<AppBar
				position="fixed"
				sx={{
					background: theme.palette.background.default,
					boxShadow: 0, top: 'auto', bottom: 0
				}}
			>
				<Toolbar>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: 'flex', }}>

						{/* <Box sx={{ pb: 1 }}>
							<Virus meta={meta as T_Meta} />
						</Box> */}
						<Box sx={{ mt: 3, ml: 2 }}>
							<Nav
								mode="mobile"
								navItems={navItems as I_NestedNav["navItems"]}
								currentPath={frontmatter?.slug || '/'}
							/>
						</Box>

					</Box>
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
