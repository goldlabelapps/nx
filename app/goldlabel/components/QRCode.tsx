import React from "react";

const QRCode: React.FC = () => (
    <a href="https://budbuddies.cc/bud/listingslab/" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
        <picture>
            <source srcSet="/png/qr_white.png" media="(prefers-color-scheme: dark)" />
            <img className="qr-image" src="/png/qr_black.png" alt="QR code" style={{ display: 'block', margin: 0, height: 'auto' }} />
        </picture>
    </a>
);

export default QRCode;
