import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import { firebaseLogin } from '../actions/firebaseLogin';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const user = await firebaseLogin(email, password);
            setUser(user);
        } catch (e) {
            alert('Sign in failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Optionally, check for existing session here
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <SignIn onSignIn={handleSignIn} />;
    return <>{children}</>;
}
