"use client";
import React from "react";

const CallToAction: React.FC = () => {
    const handleClick = () => {
        window.alert("Work in progress");
    };
    return (
        <div className="call-to-action-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="cta-text">Call To Action</div>
        </div>
    );
};

export default CallToAction;
