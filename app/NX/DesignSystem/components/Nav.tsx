"use client";
import { I_Nav, I_NavNode } from '../../types';
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
} from '@mui/material';
import { 
    Icon, 
    setDesignSystem, 
    useDesignSystem, 
    TreeNav,
    // Surface,
} from '../../../NX/DesignSystem';
import { useDispatch } from '../../../NX/Uberedux';
import { Virus } from '../../../NX/Virus';

function sortNavItems(items: any[]) {
    return [...items].sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : 9999;
        const orderB = typeof b.order === "number" ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
    });
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
    const { themeSwitching } = designSystem || {};

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
    ): React.ReactNode {

        return items
            .map((item, i) => {
                const key = `${parentKey}item_${i}`;
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                const navTarget = (typeof item.slug === 'string' && item.slug.trim().length > 0)
                    ? item.slug
                    : (typeof (item as any).path === 'string' && (item as any).path.trim().length > 0 ? (item as any).path : undefined);
                const isRoutable = typeof navTarget === 'string' && navTarget.trim().length > 0;
                const label = navTarget === '/' ? 'Home' : item.title;

                const icon = item.icon || 'settings';
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
                            <ListItemIcon>
                                <Icon icon={icon as any} color="primary" />
                            </ListItemIcon>
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
                        <Box sx={{mt:4}} />
                        <TreeNav navItems={navItems}/>
                        <Box sx={{ mt: 'auto', display: 'flex' }}>
                            <Box sx={{ mt: 1, ml: 2 }}>
                                <Virus frontmatter={frontmatter} />
                            </Box>

                            {themeSwitching && <>
                                <Box sx={{ pb: 1.5, ml:2 }}>
                                    <IconButton onClick={handleThemeModeToggle}>
                                        <Icon icon={currentThemeMode === 'light' ? 'darkmode' : 'lightmode'} color="primary" />
                                    </IconButton>
                                </Box>
                            </>}
                            
                            <Box sx={{ ml: 1 }}>
                                <IconButton onClick={handleNXAdmin}>
                                    <Icon icon={'admin'} color="primary" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            </>
        );
    }

    return (
        <Box>
            <List component={'nav'}>
                {renderNavItems(sortedNavItems)}
            </List>
        </Box>
    );
};

export default Nav;
