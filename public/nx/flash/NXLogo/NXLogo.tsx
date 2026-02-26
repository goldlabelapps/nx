"use client";
import React from 'react';

const NXLogo = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement> & { svgSrc?: string }>(
    (props, ref) => {
        const { svgSrc, style, ...rest } = props;
        return (
            <img
                alt="Logo"
                src={svgSrc}
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    margin: '0 auto',
                    objectFit: 'contain',
                    ...(style || {})
                }}
                ref={ref}
                {...rest}
            />
        );
    });

export default NXLogo;
