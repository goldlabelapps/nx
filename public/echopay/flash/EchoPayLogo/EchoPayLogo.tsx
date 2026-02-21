"use client";
import React from 'react';

const NXLogo = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>((props, ref) => {

    return (
        <img
            alt="Logo"
            src={'/nx/svg/NXLogo.svg'}
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

export default NXLogo;
