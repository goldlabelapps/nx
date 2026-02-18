
import React from 'react';
// import { useTheme } from '@mui/material';

const Logo = () => {
    // const theme = useTheme();
    // const fill = theme.palette.primary.main;
    return (
        <>
            <img
                src={'/echopay/svg/logo.svg'}
                alt="Logo"
                style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    margin: '0 auto',
                    objectFit: 'contain',
                }}
            />
        </>
    );
};

export default Logo;
