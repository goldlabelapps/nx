'use client';
import * as React from 'react';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreenOutlined';
import { useDispatch } from '../../../../Uberedux';
import { useFullscreen, toggleFullscreen } from '../index';

export default function FullscreenToggle() {
    const fullscreen = useFullscreen();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isMobile) return null;

    return (
        <IconButton
            color="primary"
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            onClick={() => dispatch(toggleFullscreen(!fullscreen))}
        >
            {fullscreen ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
        </IconButton>
    );
}
