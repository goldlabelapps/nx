import React, { useState } from "react";

interface InstallProps {
    onSubmit: (data: { appname: string }) => void;
}

export default function Install({ onSubmit }: InstallProps) {
    const [appname, setAppname] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function toApp(str: string) {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-')
            .slice(0, 64);
    }

    const isValid = appname.trim().length >= 3;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Placeholder doc object
        const now = new Date().toISOString();
        const doc = {
            id: toApp(appname),
            appname,
            createdAt: now,
            updatedAt: now,
            published: true,
        };
        console.log('Created doc:', doc);
        onSubmit({ appname });
        setSubmitted(true);
        window.alert('we are working on this');
    };
    return (
        !submitted && (
            <form onSubmit={handleSubmit} className="setup-form-modern">
                <h1 style={{ fontSize: '1.6rem', fontWeight: 400, margin: 0 }}>Install</h1>
                <p className="setup-description" style={{ marginBottom: '0.5rem' }}>
                    <b>Display Name (Site Title):</b> This will be the public-facing name of your site and can be changed later.<br />
                    <span style={{ color: 'var(--primary)', fontWeight: 500 }}>It's important!</span> This is what your users will see as your site title.<br />
                    <span style={{ fontSize: '0.97em', color: 'var(--secondary)' }}>You can update the Display Name at any time, but your <b>site ID (slug)</b> will be generated from this name and <b>cannot be changed later</b>.</span>
                </p>
                <div className="setup-field setup-field-inline" style={{ marginTop: 0 }}>
                    <label htmlFor="appname">Display Name</label>
                    <div className="setup-inline-row">
                        <input
                            id="appname"
                            type="text"
                            value={appname}
                            onChange={e => setAppname(e.target.value)}
                            required
                            autoFocus
                            className="setup-input"
                        />
                        <button type="submit" disabled={submitting || !isValid} className="setup-btn">
                            {submitting ? "Testing..." : (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4em' }}>
                                    Proceed
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 2, verticalAlign: 'middle' }}>
                                        <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    </div>
                    <div className="setup-feedback" style={{ color: isValid ? 'var(--secondary)' : 'var(--primary)', fontSize: '0.95rem', minHeight: '1.5em' }}>
                        {appname.length === 0 && "Enter an app name (at least 3 letters)."}
                        {appname.length > 0 && !isValid && "App name must be at least 3 letters."}
                        {isValid && (
                            <span>
                                Name looks good. Your app will have the unique id <b>{toApp(appname)}</b>
                            </span>
                        )}
                    </div>
                </div>
            </form>
        )
    );
}
