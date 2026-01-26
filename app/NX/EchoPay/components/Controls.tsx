'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { addTerminalMessage } from '../../EchoPay';
import { useDispatch } from '../../Uberedux';

const Controls: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleExit = () => {
		router.push('/');
	};

	const handleTerminalClick = () => {
		console.log('Terminal Clicked');
		dispatch(addTerminalMessage(`Clicked ${Date.now()}`));
	};

	return (
		<AppBar position="static" color="default" elevation={2}>
			<Toolbar>
				<IconButton
					onClick={handleTerminalClick}
					edge="start"
					color="inherit"
					sx={{ mr: 1 }}
				>
					<Icon icon="terminal" />
				</IconButton>
				<Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
					Terminal
				</Typography>
				<Button
					onClick={handleExit}
					endIcon={<Icon icon="close" />}
					color="primary"
					variant="contained"
				>
					Exit
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Controls;


/*
<Button
endIcon={<Icon icon="right" />}
color="secondary"
variant="contained"
onClick={handleStart}
>
	init
</Button>
*/