"use client";
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
    Typography,
} from '@mui/material';
import { Icon } from '../../../../app/NX/DesignSystem';
import { MenuClipAS } from './';


export default function MenuClip() {
    const router = useRouter();
    const pathname = usePathname();

    const ActionScript = React.useRef<any>(null);
    const clipRef = React.useRef<HTMLDivElement>(null);

    // const theme = useTheme();
    // let color1 = theme.palette.primary.main;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        // Initialize the ActionScript with the ref
        ActionScript.current = new MenuClipAS(clipRef);
        ActionScript.current.init();

        // ...existing code...
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleMenuItemClick = (item: typeof menuItems[number]) => {
        if (item.type === 'replay') {
            ActionScript.current.fadeOut();
            window.location.reload();
            handleMenuClose();
        } else if (item.type === 'link' && item.url) {
            if (item.url.startsWith('/')) {
                router.push(item.url);
            } else if (item.url.startsWith('http')) {
                window.open(item.url, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = item.url;
            }
            handleMenuClose();
        }
    };

    // Example menu items
    const menuItems: {
        icon: import('../../../../app/NX/types').I_Icon['icon'];
        title: string;
        description?: string;
        type?: 'link' | 'replay';
        url?: string;
        help?: string;
    }[] = [
            {
                type: 'link',
                icon: 'book',
                title: 'Find out more',
                url: '/testimonial',
                help: `Navigate to the Testimonial page to view detailed analytics and reports`,
            },
            {
                icon: 'reset',
                type: 'replay',
                title: 'Restart',
                help: `Replay the animation from the beginning. Useful for testing and debugging.`,
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
                sx={{
                    background: 0
                }}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{ style: { minWidth: 300 } }}
            >
                <List dense>
                    {menuItems.map((item, idx: number) => (
                        <ListItemButton
                            key={`menuitem_${idx}`}
                            onClick={() => handleMenuItemClick(item)}
                        >
                            <ListItemIcon sx={{ ml: 1 }}>
                                <Icon icon={item.icon} />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography>{item?.title}</Typography>}
                                secondary={item?.description}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Menu>
        </Box>
    );
}
