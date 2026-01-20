'use client';
import React from "react";
import type { T_Config, T_Frontmatter } from '../../types';
import {
	AppBar,
	Toolbar,
	Fab,
	useTheme,
} from '@mui/material';
import CTAIcon from '@mui/icons-material/RocketLaunch';

export interface I_Footer {
	config: T_Config;
	frontmatter?: T_Frontmatter;
	bgcolor?: string;
}

const Footer: React.FC<I_Footer> = ({
	config,
	frontmatter,
	bgcolor = "rgb(21, 159, 90)",
}) => {
	const theme = useTheme();
	return (
		<AppBar
			position="fixed"
			color="default"
			sx={{
				top: 'auto',
				bottom: 0,
				background: bgcolor,
				boxShadow: 0,
			}}>
			<Toolbar>
				<Fab
					color="primary"
					aria-label="Call To Action"
					sx={{
						position: 'absolute',
						zIndex: 12345,
						top: -8,
						left: 0,
						right: 0,
						margin: '0 auto',
						boxShadow: 0,
					}}>
					<CTAIcon />
				</Fab>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
