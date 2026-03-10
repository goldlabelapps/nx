"use client";
import { I_NavNode, T_Frontmatter } from '../../types';
import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography,
} from '@mui/material';
import { Icon, setDesignSystem, useDesignSystem } from '../../../NX/DesignSystem';
import { useDispatch } from '../../../NX/Uberedux';
import { Virus } from '../../../NX/Virus';
import { Async } from '../../../NX/Async';


function sortNavItems(items: any[]) {
    return [...items].sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : 9999;
        const orderB = typeof b.order === "number" ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
    });
}

interface I_Nav {
    navItems: I_NavNode[];
    mode?: 'mobile' | 'desktop';
    frontmatter?: T_Frontmatter;
}

const Nav: React.FC<I_Nav> = ({
    navItems,
    mode = 'desktop',
    frontmatter,
}) => {
    const router = useRouter();
    const sortedNavItems = sortNavItems(navItems);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const dispatch = useDispatch();
    const designSystem = useDesignSystem();
    const currentThemeMode = designSystem?.themeMode ?? 'light';


    const handleThemeModeToggle = () => {
        const nextMode = currentThemeMode === 'light' ? 'dark' : 'light';
        dispatch(setDesignSystem('themeMode', nextMode));
        setDrawerOpen(false);
    }

    const handleNXAdmin = () => {
        setDrawerOpen(false);
        router.push('/nx-admin');
    };

    function handleNavClick(slug?: string) {
        if (typeof slug === 'string' && slug.trim().length > 0) {
            router.push(slug);
            setDrawerOpen(false);
        } else {
            console.log('No valid slug for nav item:', slug);
        }
    }

    function renderNavItems(
        items: I_NavNode[],
        parentKey = '',
        // parentNavTarget?: string,
    ): React.ReactNode {

        // Suppress subpages whose slug or path ends with '/index' or is 'index.md'
        return items
            .map((item, i) => {
                const key = `${parentKey}item_${i}`;
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                const navTarget = (typeof item.slug === 'string' && item.slug.trim().length > 0)
                    ? item.slug
                    : (typeof (item as any).path === 'string' && (item as any).path.trim().length > 0 ? (item as any).path : undefined);
                const isRoutable = typeof navTarget === 'string' && navTarget.trim().length > 0;
                const label = navTarget === '/' ? 'Home' : item.title;
                // Filter children whose path matches this item's path
                let filteredChildren = item.children;
                if (hasChildren && item.path) {
                    filteredChildren = item.children!.filter(child => child.path !== item.path);
                }
                return (
                    <Box key={key}>
                        <ListItemButton
                            onClick={isRoutable ? (e) => {
                                e.preventDefault();
                                handleNavClick(navTarget);
                            } : undefined}
                            disabled={!isRoutable}
                            sx={!isRoutable ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                        >
                            <ListItemText primary={label} />
                        </ListItemButton>
                        {hasChildren && filteredChildren && filteredChildren.length > 0 && (
                            <List sx={{ ml: 2 }}>
                                {renderNavItems(sortNavItems(filteredChildren), key + '_')}
                            </List>
                        )}
                    </Box>
                );
            })
            .filter(Boolean);
    }
    // Removed stray slash and 'return true' lines that caused syntax error
    if (mode === 'mobile') {
        return (
            <>
                <IconButton
                    color="primary"
                    onClick={() => setDrawerOpen(true)} aria-label="Open Menu">
                    <Icon icon='menu' />
                </IconButton>

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}>
                    <Box
                        sx={{
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 1,
                            minWidth: 310,
                        }}
                        role="presentation">
                        <Async />
                        <List component={'nav'}>
                            {renderNavItems(sortedNavItems)}
                        </List>
                        <Box sx={{ mt: 'auto' }}>
                            <ListItemButton onClick={handleThemeModeToggle}>
                                <ListItemIcon>
                                    <Icon icon={currentThemeMode === 'light' ? 'darkmode' : 'lightmode'} color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography>
                                        {currentThemeMode === 'light' ? 'Dark' : 'Light'} mode
                                    </Typography>}
                                />
                            </ListItemButton>

                            <ListItemButton onClick={handleNXAdmin}>
                                <ListItemIcon>
                                    <Icon icon="admin" color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={'NX Admin'} />
                            </ListItemButton>
                            <Box sx={{ my: 2 }}>
                                <Virus frontmatter={frontmatter} />
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            </>
        );
    }

    // Desktop mode
    return (
        <Box>
            <List component={'nav'}>
                {renderNavItems(sortedNavItems)}
            </List>
        </Box>
    );
};

export default Nav;
