"use client";
import React from "react";

interface CallToActionProps {
    label?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ label = "Call To Action" }) => {
    const handleClick = () => {
        window.alert("Work in progress");
    };
    return (
        <div className="call-to-action-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="cta-text">{label}</div>
        </div>
    );
};

export default CallToAction;
