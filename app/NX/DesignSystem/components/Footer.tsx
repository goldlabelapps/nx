'use client';
import React, { useState } from "react";
import type { T_Config, T_Frontmatter } from '../../types';
import {
	Box,
	useTheme,
	IconButton,
	Dialog,
	CardHeader,
	useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CTAIcon from '@mui/icons-material/Share';
import { Share } from '../../DesignSystem';

export interface I_Footer {
	config: T_Config;
	frontmatter?: T_Frontmatter;
}

const Footer: React.FC<I_Footer> = ({
	frontmatter,
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
				sx={{
					position: 'absolute',
					zIndex: 12345,
					bottom: 8,
					right: 8,
					boxShadow: 0,
				}}
				onClick={handleOpen}
			>
				<CTAIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={isMobile}
				maxWidth="xs"
				fullWidth
			>
				<CardHeader
					title={frontmatter?.title}
					subheader={frontmatter?.description}
					action={
						<IconButton aria-label="close" onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					}
				/>
				<Share
					frontmatter={frontmatter}
				/>
				<Box sx={{ height: 16 }} />
			</Dialog>
		</>
	);
};

export default Footer;
