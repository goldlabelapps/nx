'use client';
import React, { useState } from "react";
import type { T_Config, T_Frontmatter, T_SmartImage } from '../../../../app/NX/types';
import {
	useTheme,
	IconButton,
	Dialog,
	CardHeader,
	CardContent,
	useMediaQuery,
} from '@mui/material';
import { Share, Icon } from '../../../../app/NX/DesignSystem';
// import { useDispatch } from '../../../../app/NX/Uberedux';

export interface I_CallToAction {
	config: T_Config;
	frontmatter?: T_Frontmatter;
	smartImage?: T_SmartImage;
}

const CallToAction: React.FC<I_CallToAction> = ({
	frontmatter,
	smartImage,
}) => {
	const theme = useTheme();
	// const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	// const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<IconButton
				color="primary"
				aria-label="Call To Action"
				onClick={handleOpen}
			>
				<Icon icon="share" />
			</IconButton>
			<Share
				frontmatter={frontmatter}
				smartImage={smartImage}
			/>
		</>
	);
};

export default CallToAction;
