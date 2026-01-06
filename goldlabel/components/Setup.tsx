import React, { useState } from "react";


interface InstallProps {
    onSubmit: (data: { sitename: string; description: string; namespace: string }) => void;
}

export default function Install({ onSubmit }: InstallProps) {
    const [sitename, setSitename] = useState("");
    const [description, setDescription] = useState("");
    const [namespace, setNamespace] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function slugify(str: string) {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/--+/g, '-');
    }

    const isValid = sitename.trim().length >= 3 && description.trim().length >= 10;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        let ns = namespace.trim();
        if (!ns) {
            ns = slugify(sitename);
        }
        onSubmit({ sitename, description, namespace: ns });
    };
    return (
        <form onSubmit={handleSubmit} className="setup-form-modern">
            <h2 className="setup-title">Install</h2>
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
            <div className="setup-field">
                <label htmlFor="description">Meta Description</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    placeholder="A modern content platform..."
                    className="setup-input"
                />
            </div>
            <div className="setup-field">
                <label htmlFor="namespace">Namespace <span className="setup-hint">(unique slug, e.g. goldlabel.com or my-site)</span></label>
                <input
                    id="namespace"
                    type="text"
                    value={namespace}
                    onChange={e => setNamespace(e.target.value)}
                    placeholder="goldlabel.com"
                    className="setup-input"
                    pattern="^[a-zA-Z0-9.-]*$"
                />
            </div>
            <button type="submit" disabled={submitting || !isValid} className="setup-btn">
                {submitting ? "Installing..." : "Install"}
            </button>
        </form>
    );
}
