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
import { Icon } from '../../DesignSystem';
import { useSlice } from '../../Uberedux';
import { firebaseLogout } from '../../Paywall';

export interface I_Settings {
	options?: any;
}

const Settings: React.FC<I_Settings> = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const slice = useSlice();

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
		console.log('toggle theme mode');
	}

	const handleNXAdmin = () => {
		router.push('/nx-admin');
	};

	if (loading) return null;

	return (
		<List dense sx={{ my: 1 }}>
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

			<ListItemButton
				id="theme-toggle-btn"
				onClick={handleThemeModeToggle}
			>
				<ListItemIcon>
					<Icon icon="lightmode" color="primary" />
				</ListItemIcon>
				<ListItemText
					primary={<Typography>
					</Typography>}
				/>
			</ListItemButton>


			{
				user && (
					<>
						<ListItemButton
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
					</>
				)
			}

			{/* <pre>{JSON.stringify(slice, null, 2)}</pre> */}

		</List>
	);
};

export default Settings;
