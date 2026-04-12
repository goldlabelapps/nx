"use client";
import * as React from 'react';
import type { T_Config, T_Frontmatter } from '../../types';
import { useRouter, usePathname } from 'next/navigation';
import {
	Container,
	Avatar,
	useTheme,
	CardHeader,
	IconButton,
	AppBar,
	Typography,
} from '@mui/material';
import { navigateTo } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface I_Header {
	config: T_Config;
	frontmatter: T_Frontmatter;
}

export default function Header({
	config,
	frontmatter,
}: I_Header) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const router: ReturnType<typeof useRouter> = useRouter();
    const themeMode = theme?.palette?.mode || 'light';
	const avatar = config?.avatars?.[themeMode] || '';
    const {title} = frontmatter || {};

	const pathname = usePathname();

	const handleAvatarClick = () => {
		if (pathname === '/') return;
		dispatch(navigateTo(router, '/'));
	}

	const handleAccountClick = () => {
		if (pathname === '/account') return;
		dispatch(navigateTo(router, '/account'));
	}

	return (
		<header>
			<AppBar
				position="fixed"
				color="default"
				sx={{
					boxShadow: 0,
					background: theme.palette?.background?.default || 'inherit',
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
						// subheader={pathname}
						avatar={<IconButton onClick={handleAvatarClick}>
									<Avatar src={avatar} />
								</IconButton>}
					/>
				</Container>
			</AppBar>			
		</header>
	);
}
