'use client';
import React from "react";
import {
	Box,
	IconButton,
} from '@mui/material';
import { useEchopay, setEchoPay } from '../../EchoPay';
import { useDispatch } from '../../Uberedux';
import { Icon } from '../../DesignSystem';

const Terminal: React.FC = () => {

	const dispatch = useDispatch();
	const echopay = useEchopay();
	const messages: string[] = Array.isArray(echopay?.message)
		? echopay.message
		: echopay?.message
			? [String(echopay.message)]
			: [];

	const handleHideTerminal = () => {
		dispatch(setEchoPay('hideTerminal', true));
	}

	return (
		<Box
			data-testid="terminal-screen"
			sx={{
				background: '#f0f0f0',
				borderRadius: 3,
				height: 385,
				maxHeight: 385,
				minHeight: 200,
				width: '100%',
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column',
				p: 2,
				fontFamily: 'monospace',
				fontSize: 16,
				color: '#1d1d1d',
				position: 'relative',
				'& .cursor': { color: '#002a67' },
			}}
		>
			<IconButton
				onClick={handleHideTerminal}
				sx={{
					position: 'absolute',
					top: 8,
					right: 8,
					zIndex: 1,
				}}
			>
				<Icon icon="hide" />
			</IconButton>
			{messages.length === 0 ? (
				<span style={{ color: '#002a67' }}>&gt; </span>
			) : (
				messages.map((msg, idx) => (
					<div key={idx} style={{ marginBottom: 4 }}>
						<span className="cursor">&gt;</span> {msg}
					</div>
				))
			)}
		</Box>
	);
};

export default Terminal;
