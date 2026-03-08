"use client";
import type { T_Frontmatter, T_NavItem, I_NestedNav, T_Meta } from '../../types';
import * as React from 'react';
import {
	useTheme,
	Toolbar,
	Box,
	AppBar,
} from '@mui/material';
import {
	// Icon,
	Nav,
	SettingsMenu,
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
	meta,
}: I_Footer) {

	const theme = useTheme();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
						<Box sx={{ m: 2 }}>
							<SettingsMenu />
							<Nav
								mode="mobile"
								navItems={navItems as I_NestedNav["navItems"]}
								frontmatter={frontmatter}
							/>
						</Box>
					</Box>
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
