// /Users/milky/My Drive/GitHub/nx/app/NX/Flash/Scenes/Goldlabel/LogoMC/logo.svg
"use client";
import React from 'react';
// import { useTheme } from '@mui/material';

const Logo = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>((props, ref) => {
    // const theme = useTheme();
    // const fill = theme.palette.primary.main;
    return (
        <img
            alt="Logo"
            src={'/echopay/flash/LogoMC/logo.svg'}
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

export default Logo;
