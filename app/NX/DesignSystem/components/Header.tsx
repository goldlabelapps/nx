"use client";
import * as React from 'react';
import type { T_Config, T_Frontmatter } from '../../types';
import { useRouter } from 'next/navigation';
import {
	Container,
	Avatar,
	useTheme,
	CardHeader,
	IconButton,
	AppBar,
	Typography,
} from '@mui/material';

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
	const avatar = config?.avatars?.[themeMode] || '';
    const {title} = frontmatter || {};

	const handleAvatarClick = () => {
		router.push('/');
	}

	const handleUserClick = () => {
		router.push('/nx-admin');
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
								<Avatar src={avatar} />
							</IconButton>}
						action={<IconButton onClick={handleUserClick}>
							<Avatar src={avatar} />
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
