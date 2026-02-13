'use client';
import React, { useState } from "react";
import type { T_Config, T_Frontmatter, T_SmartImage } from '../../types';
import {
	Box,
	useTheme,
	IconButton,
	Dialog,
	CardHeader,
	CardContent,
	useMediaQuery,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Share, Icon } from '../../DesignSystem';
import { usePaywall, firebaseLogout } from '../../Paywall';
import { useDispatch } from '../../Uberedux';


export interface I_Settings {
	config: T_Config;
	frontmatter?: T_Frontmatter;
	smartImage?: T_SmartImage;
}

const Settings: React.FC<I_Settings> = ({
	frontmatter,
	smartImage,
}) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const paywallRaw = usePaywall();
	const paywall = paywallRaw && typeof paywallRaw === 'object' ? paywallRaw : {};

	const handleLogout = async () => {
		await firebaseLogout();
		// Optionally, dispatch a logout action here if you have one, or trigger state update as needed
	};

	return (
		<>
			<IconButton
				color="primary"
				aria-label="Call To Action"
				onClick={handleOpen}
			>
				<Icon icon="share" />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={isMobile}
				maxWidth="xs"
				fullWidth
			>
				<CardHeader
					avatar={<Icon icon="share" />}
					title={'Share'}
					// subheader={frontmatter?.description}
					action={
						<IconButton aria-label="close" onClick={handleClose}>
							<Icon icon="close" color="primary" />
						</IconButton>
					}
				/>
				<CardContent>
					<Share
						frontmatter={frontmatter}
						smartImage={smartImage}
					/>
					{paywall && paywall.firebaseUser && (
						<ListItemButton onClick={handleLogout} sx={{ mb: 2 }}>
							<ListItemIcon>
								<Icon icon="signout" color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={<Typography color="primary">Sign Out</Typography>}
							/>
						</ListItemButton>
					)}

				</CardContent>
			</Dialog>
		</>
	);
};

export default Settings;
