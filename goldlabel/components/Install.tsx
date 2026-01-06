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
                <p className="setup-description">
                    Enter a unique app name below and click Install to verify your Firestore connection. This will be used as your <b>app</b> identifier.
                </p>
                <div className="setup-field setup-field-inline">
                    <label htmlFor="appname">App Name</label>
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
                            {submitting ? "Testing..." : "Test Firebase"}
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
