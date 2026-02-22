"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import {
	useTheme,
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

export default function BottomAppBar() {
	const theme = useTheme();
	return (
		<React.Fragment>
			<AppBar
				position="fixed"
				color="default"
				sx={{
					backgroundColor: theme.palette.background.default,
					boxShadow: 0,
					top: 'auto', bottom: 0
				}}>
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
					<IconButton color="primary">
						<Icon icon="down" />
					</IconButton>
					<IconButton color="primary">
						<Icon icon="search" />
					</IconButton>

					{/* <Settings
						config={config}
						frontmatter={data}
					/>
					<Nav
						mode="mobile"
						navItems={navItems as I_NestedNav["navItems"]}
						currentPath={data.slug || '/'}
						config={config}
					/> */}


				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
