import React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '../../lib/firebase';

export default function UserCard() {
    const router = useRouter();

    const handleSignout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const auth = getFirebaseAuth();
            const { signOut } = await import('firebase/auth');
            await signOut(auth);
            router.push('/nx-admin');
        } catch (err) {
            // Optionally handle error (e.g., show notification)
            console.error('Signout failed', err);
        }
    }



    return (
        <IconButton onClick={handleSignout} color="primary">
            <Icon icon="signout" />
        </IconButton>
    );
}
