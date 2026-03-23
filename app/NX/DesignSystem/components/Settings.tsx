'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { useFirebaseAuthListener } from '../../lib';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Icon, setDesignSystem, useDesignSystem } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';
import { firebaseLogout } from '../../Paywall';

export interface I_Settings {
	options?: any;
}

const Settings: React.FC<I_Settings> = () => {

	const dispatch = useDispatch();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const designSystem = useDesignSystem();
	const currentThemeMode = designSystem?.themeMode ?? 'light';

	useFirebaseAuthListener((firebaseUser) => {
		setUser(firebaseUser);
		setLoading(false);
	});

	const handleLogout = async () => {
		await firebaseLogout();
	};

	const handleThemeModeToggle = () => {
		const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
		dispatch(setDesignSystem('themeMode', nextMode));
	}

	const handleNXAdmin = () => {
		router.push('/nx-admin');
	};

	if (loading) return null;

	return (
		<List dense sx={{}}>
			<ListItemButton
				id="theme-toggle-btn"
				onClick={handleThemeModeToggle}
			>
				<ListItemIcon>
					<Icon icon={currentThemeMode === 'light' ? 'darkmode' : 'lightmode'} color="primary" />
				</ListItemIcon>
				<ListItemText
					primary={<Typography>
						{currentThemeMode === 'light' ? 'Dark' : 'Light'}
					</Typography>}
				/>
			</ListItemButton>
			<ListItemButton
				id="nx-admin-btn"
				onClick={handleNXAdmin}
			>
				<ListItemText
					primary={<Typography>
						NX Admin
					</Typography>}
				/>
				<ListItemIcon>
					<Icon icon="right" color="primary" />
				</ListItemIcon>
			</ListItemButton>
		</List>
	);
};

export default Settings;
