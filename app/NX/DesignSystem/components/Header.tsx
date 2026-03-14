"use client";
import type { T_Config, T_Frontmatter } from '../../types';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
	Box,
	Container,
	Avatar,
	useTheme,
	CardHeader,
	IconButton,
	AppBar,
	Typography,
} from '@mui/material';
import {
	Virus,
} from '../../Virus';

export interface I_Header {
	config: T_Config;
	frontmatter: T_Frontmatter;
}

export default function Header({
	config,
	frontmatter,
}: I_Header) {
	const theme = useTheme();
	const router = useRouter();
    const themeMode = theme?.palette?.mode || 'light';
    const icon = config?.icons?.[themeMode]?.icon || '';
    const {title} = frontmatter || {};

	const handleAvatarClick = () => {
		router.push('/');
	}

	return (
		<header>
			<AppBar
				position="fixed"
				color="default"
				sx={{
					boxShadow: 0,
					background: theme.palette?.background?.default || 'transparent',
				}}>
				<Container maxWidth="lg">
				<CardHeader
					
					avatar={<IconButton onClick={handleAvatarClick}>
                        <Avatar src={icon} />
					</IconButton>}
					title={<Typography
						color='secondary'
						variant="h5"
						component="h1"
						sx={{ mt: 0.25 }}
					>
						{title}
					</Typography>}
				/>
				</Container>
			</AppBar>			
		</header>
	);
}
