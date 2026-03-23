// The import for getFirebaseAuth is not present in the file, so no action is needed.
"use client";
import { useState } from "react";
import { useFirebaseAuthListener } from '../NX/lib';
import { getFirebaseAuth } from '../NX/lib/firebase';
import { SignIn } from '../NX/Paywall';
import { NXAdmin } from '../NX/NXAdmin';

export default function NXAdminAuthWrapper({
    config,
}: {
    config: any,
}) {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useFirebaseAuthListener((u) => {
        setUser(u);
        setLoading(false);
    });

    const [signInError, setSignInError] = useState<string>("");

    const handleSignIn = async (email: string, password: string) => {
        setSignInError("");
        try {
            const auth = getFirebaseAuth();
            const { signInWithEmailAndPassword } = await import("firebase/auth");
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
        } catch (err: any) {
            setSignInError(err?.message || "Sign in failed");
        }
    };

    if (loading) return null;
    if (!user) {
        return <SignIn onSignIn={handleSignIn} config={config} error={signInError} />;
    }
    return <NXAdmin config={config} />;
}
