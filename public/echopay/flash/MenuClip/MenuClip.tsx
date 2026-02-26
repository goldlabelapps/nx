"use client";
import * as React from 'react';
import type { I_Icon } from '../../../../app/NX/types';
import {
    // useTheme,
    Box,
    IconButton,
    Menu,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { Icon } from '../../../../app/NX/DesignSystem';
import { MenuClipAS } from './';

export default function MenuClip() {

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);

    // const theme = useTheme();
    // let color1 = theme.palette.primary.main;


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        ActionScript.current = new MenuClipAS(clipRef);
        ActionScript.current.init();
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Example menu items
    const menuItems: { icon: import('../../../../app/NX/types').I_Icon['icon']; primary: string; secondary: string }[] = [
        {
            icon: 'user',
            primary: 'Profile',
            secondary: 'View your profile',
        },
        {
            icon: 'settings',
            primary: 'Settings',
            secondary: 'Adjust preferences',
        },
        {
            icon: 'signout',
            primary: 'Logout',
            secondary: 'Sign out of your account',
        },
    ];

    return (
        <Box ref={clipRef}>
            <IconButton
                onClick={handleMenuOpen}
            >
                <Icon icon="fingerprint" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ style: { minWidth: 240 } }}
            >
                <List dense>
                    {menuItems.map((item, idx) => (
                        <ListItemButton key={idx} onClick={handleMenuClose} alignItems="flex-start">
                            <ListItemIcon>
                                <Icon icon={item.icon} />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.primary}
                                secondary={item.secondary}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Menu>
        </Box>
    );
}
