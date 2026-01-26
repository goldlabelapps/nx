'use client';
import React from "react";
import {
	useTheme,
	Box,
} from '@mui/material';
import { useEchopay } from '../../EchoPay';

const Terminal: React.FC = () => {
	const echopay = useEchopay();
	const messages: string[] = Array.isArray(echopay?.message)
		? echopay.message
		: echopay?.message
			? [String(echopay.message)]
			: [];

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
				'& .gold': { color: '#938014' },
			}}
		>
			{messages.length === 0 ? (
				<span style={{ color: '#c5c5c5' }}>&gt; </span>
			) : (
				messages.slice().reverse().map((msg, idx) => (
					<div key={idx} style={{ marginBottom: 4 }}>
						<span className="gold">&gt;</span> {msg}
					</div>
				))
			)}
		</Box>
	);
};

export default Terminal;
