import React, { useState } from "react";

interface InstallProps {
    onSubmit: (data: { sitename: string }) => void;
}

export default function Install({ onSubmit }: InstallProps) {
    const [sitename, setSitename] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function slugify(str: string) {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-');
    }

    const isValid = sitename.trim().length >= 3;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        onSubmit({ sitename });
    };
    return (
        <form onSubmit={handleSubmit} className="setup-form-modern">
            <p className="setup-description">
                No homepage was found in Firebase. Let's create one now to get started.
            </p>
            <div className="setup-field">
                <label htmlFor="sitename">Site Name</label>
                <input
                    id="sitename"
                    type="text"
                    value={sitename}
                    onChange={e => setSitename(e.target.value)}
                    required
                    placeholder="Goldlabel"
                    className="setup-input"
                />
            </div>
            <button type="submit" disabled={submitting || !isValid} className="setup-btn">
                {submitting ? "Installing..." : "Install"}
            </button>
        </form>
    );
}
