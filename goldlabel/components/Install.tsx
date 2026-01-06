import React, { useState } from "react";

interface InstallProps {
    onSubmit: (data: { appname: string }) => void;
}

export default function Install({ onSubmit }: InstallProps) {
    const [appname, setAppname] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function slugify(str: string) {
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
        onSubmit({ appname });
    };
    return (
        <form onSubmit={handleSubmit} className="setup-form-modern">
            <p className="setup-description">
                Welcome to the Goldlabel installer. We're about to test your Firestore connection and perform a create operation on your database. This step requires that your Firestore setup is complete and accessible from this app. If you've finished your Firebase and Firestore configuration, enter a site name below and click Install to verify everything is working. Ready to test your Firestore connection?
            </p>
            <div className="setup-field">
                <label htmlFor="appname">App Name</label>
                <input
                    id="appname"
                    type="text"
                    value={appname}
                    onChange={e => setAppname(e.target.value)}
                    required
                    autoFocus
                    className="setup-input"
                />
                <div style={{ paddingBottom: "0.5rem" }} />
                <div className="setup-feedback" style={{ color: isValid ? 'green' : 'var(--primary)', fontSize: '0.95rem', minHeight: '1.5em' }}>
                    {appname.length === 0 && "Enter an app name (case sensitive, at least 3 letters)."}
                    {appname.length > 0 && !isValid && "App name must be at least 3 letters."}
                    {isValid && (
                        <span>
                            App name looks good!<br />
                            <span style={{ fontWeight: 500 }}>
                                Slug: <span style={{ fontFamily: 'monospace', background: '#f6f6f6', padding: '0.1em 0.4em', borderRadius: '0.3em' }}>{slugify(appname)}</span>
                            </span>
                        </span>
                    )}
                </div>
            </div>
            <button type="submit" disabled={submitting || !isValid} className="setup-btn">
                {submitting ? "Testing..." : "Test Connection"}
            </button>
        </form>
    );
}
