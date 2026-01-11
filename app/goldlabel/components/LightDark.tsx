"use client";
import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";


const themeIcons = {
    light: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
    ),
    dark: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
    ),
};

const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute("data-theme", theme);
};

const LightDark: React.FC = () => {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored === "light" || stored === "dark") {
            setTheme(stored);
            applyTheme(stored);
        } else {
            setTheme("light");
            applyTheme("light");
        }
    }, []);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    return (
        <div className="goldlabel-theme-toggle">
            {["light", "dark"].map((t) => (
                <a
                    key={t}
                    aria-label={`Switch to ${t} mode`}
                    onClick={() => handleThemeChange(t as Theme)}
                    type="button"
                    className={`goldlabel-theme-toggle-btn${theme === t ? " selected" : ""}`}
                >
                    {themeIcons[t as Theme]}
                </a>
            ))}
        </div>
    );
};

export default LightDark;
