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
	Typography,
} from '@mui/material';
import { Share, Icon } from '../../DesignSystem';

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
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<IconButton
				color="primary"
				aria-label="Call To Action"
				onClick={handleOpen}
			>
				<Icon icon="settings" />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={isMobile}
				maxWidth="xs"
				fullWidth
			>
				<CardHeader
					avatar={<Icon icon="settings" />}
					title={'Settings'}
					// subheader={frontmatter?.description}
					action={
						<IconButton aria-label="close" onClick={handleClose}>
							<Icon icon="close" />
						</IconButton>
					}
				/>
				<CardContent>
					<Typography variant="h6">Share</Typography>

				</CardContent>
				<Share
					frontmatter={frontmatter}
					smartImage={smartImage}
				/>
				<Box sx={{ height: 16 }} />
			</Dialog>
		</>
	);
};

export default Settings;
