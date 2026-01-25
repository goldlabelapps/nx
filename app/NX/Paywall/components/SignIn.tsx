import React from 'react';

export default function SignIn({ onSignIn }: { onSignIn: () => void }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <h2>Sign in to continue</h2>
            <button onClick={onSignIn} style={{ padding: '0.75em 2em', fontSize: '1.1em', borderRadius: 8, background: '#0070f3', color: '#fff', border: 'none', marginTop: 16 }}>
                Sign in with Google
            </button>
        </div>
    );
}
