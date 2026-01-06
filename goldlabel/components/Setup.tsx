import React, { useState } from "react";

interface SetupProps {
    onSubmit: (data: { sitename: string; description: string; author: string }) => void;
}

export default function Setup({ onSubmit }: SetupProps) {
    const [sitename, setSitename] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        onSubmit({ sitename, description, author });
    };

    return (
        <form onSubmit={handleSubmit} className="setup-form">
            <h2>Setup Your Site</h2>
            <label>
                Site Name
                <input
                    type="text"
                    value={sitename}
                    onChange={e => setSitename(e.target.value)}
                    required
                />
            </label>
            <label>
                Meta Description
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Author
                <input
                    type="text"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
            </label>
            <button type="submit" disabled={submitting}>
                {submitting ? "Setting up..." : "Create Homepage"}
            </button>
        </form>
    );
}
