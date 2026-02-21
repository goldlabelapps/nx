// 
"use client";
import React from 'react';

const EchoPayLogo = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>((props, ref) => {

    const src = '/echopay/flash/EchoPayLogo/EchoPayLogo.svg';
    return (
        <img
            alt="Logo"
            src={src}
            style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                margin: '0 auto',
                objectFit: 'contain',
                ...(props.style || {})
            }}
            ref={ref}
            {...props}
        />
    );
});

export default EchoPayLogo;
