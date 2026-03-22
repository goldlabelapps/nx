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
import {UserSpot} from '../../Paywall';

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
		router.push('/account');
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
					title={<Typography
						color='secondary'
						variant="h5"
						component="h1"
						sx={{ mt: 0.25 }}
					>
						{title}
					</Typography>}
					avatar={<IconButton onClick={handleAvatarClick}>
								<Avatar src={avatar} />
							</IconButton>}
					action={<UserSpot onClick={handleUserClick} />}
				/>
				</Container>
			</AppBar>			
		</header>
	);
}
