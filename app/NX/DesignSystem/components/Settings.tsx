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
import { firebaseLogout } from '../../Paywall';

export interface I_Settings {
	options?: any;
}

const Settings: React.FC<I_Settings> = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

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


	const handleNXAdmin = () => {
		router.push('/nx-admin');
	};

	if (loading) return null;

	return (
		<List dense sx={{ my: 1 }}>
			<ListItemButton
				id="nx-admin-button"
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
			{
				user && (
					<>
						<ListItemButton
							id="signout-button"
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
		</List>
	);
};

export default Settings;
