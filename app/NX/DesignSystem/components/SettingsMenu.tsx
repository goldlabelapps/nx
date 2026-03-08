'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import {
    Box,
    IconButton,
    Menu,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { useDesignSystem, setDesignSystem, Icon } from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export interface SettingsMenuProps {
    config?: any;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ config }) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const designSystem = useDesignSystem();
    const currentThemeMode = designSystem?.themeMode ?? 'light';

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleThemeModeToggle = () => {
        const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
        dispatch(setDesignSystem('themeMode', nextMode));
    }

    const handleNXAdmin = () => {
        handleClose();
        router.push('/nx-admin');
    };

    return (
        <>
            <IconButton
                color="primary"
                aria-label={'Settings'}
                onClick={handleOpen}
            >
                <Icon icon="settings" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ width: 300 }} />
                <ListItemButton
                    id="theme-toggle-btn"
                    onClick={handleThemeModeToggle}
                >
                    <ListItemIcon>
                        <Icon icon={currentThemeMode === 'light' ? 'darkmode' : 'lightmode'} color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography>
                            {currentThemeMode === 'light' ? 'Dark' : 'Light'}
                        </Typography>}
                    />
                </ListItemButton>

                <ListItemButton onClick={handleNXAdmin}>
                    <ListItemIcon>
                        <Icon icon="admin" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={'NX Admin'} />
                </ListItemButton>
            </Menu>
        </>
    );
};

export default SettingsMenu;