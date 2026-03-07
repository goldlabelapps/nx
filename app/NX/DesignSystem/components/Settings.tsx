'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
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

	useEffect(() => {
		const auth = getFirebaseAuth();
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

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
		<List dense sx={{ my: 1 }}>
			{user && (<ListItemButton
				id="signout-btn"
				onClick={handleLogout}
			>
				<ListItemIcon>
					<Icon icon="signout" color="primary" />
				</ListItemIcon>
				<ListItemText
					primary={<Typography>
						Sign Out
					</Typography>}
				/>
			</ListItemButton>
			)}

			<ListItemButton
				id="nx-admin-btn"
				onClick={handleNXAdmin}
			>
				<ListItemIcon>
					<Icon icon="admin" color="primary" />
				</ListItemIcon>
				<ListItemText
					primary={<Typography>
						NX Admin
					</Typography>}
				/>
			</ListItemButton>
			{/* <pre>currentThemeMode {JSON.stringify(currentThemeMode, null, 2)}</pre> */}
			<ListItemButton
				id="theme-toggle-btn"
				onClick={handleThemeModeToggle}
			>
				<ListItemIcon>
					<Icon icon={currentThemeMode === 'light' ? 'darkmode' : 'lightmode'} color="primary" />
				</ListItemIcon>
				<ListItemText
					primary={<Typography>
						Go {currentThemeMode === 'light' ? 'Dark' : 'Light'}
					</Typography>}
				/>
			</ListItemButton>
		</List>
	);
};

export default Settings;
