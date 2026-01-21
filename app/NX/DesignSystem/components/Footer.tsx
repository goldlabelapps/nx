'use client';
import React, { useState } from "react";
import type { T_Config, T_Frontmatter } from '../../types';
import {
	AppBar,
	Toolbar,
	useTheme,
	IconButton,
	Dialog,
	DialogContent,
	CardHeader,
	useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CTAIcon from '@mui/icons-material/Share';
import { Share } from '../../DesignSystem';

export interface I_Footer {
	config: T_Config;
	frontmatter?: T_Frontmatter;
	bgcolor?: string;
	metaImage?: string;
}

const Footer: React.FC<I_Footer> = ({
	metaImage,
	frontmatter,
	bgcolor = "white",
}) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	console.log("metaImage", metaImage);

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
				<IconButton
					color="primary"
					aria-label="Call To Action"
					sx={{
						position: 'absolute',
						zIndex: 12345,
						top: -8,
						right: 16,
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
						avatar={<CTAIcon color="primary" />}
						title="Share"
						subheader={<>
							{frontmatter?.title && (
								<>{frontmatter.title}, </>
							)}
							{frontmatter?.description && (<>{frontmatter.description}</>
							)}
						</>}
						action={
							<IconButton aria-label="close" onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						}
					/>
					<DialogContent>
						<Share
							metaImage={metaImage}
							frontmatter={frontmatter}
						/>
					</DialogContent>
				</Dialog>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
