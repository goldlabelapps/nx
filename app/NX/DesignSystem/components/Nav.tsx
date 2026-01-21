"use client";
import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import { I_NavNode } from '../../types';
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import { Icon } from '../../DesignSystem';

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
    currentPath?: string;
    mode?: 'mobile' | 'desktop';
}

const Nav: React.FC<I_Nav> = ({
    navItems,
    mode = 'desktop',
}) => {
    const router = useRouter();
    const sortedNavItems = sortNavItems(navItems);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    function handleNavClick(slug?: string) {
        if (typeof slug === 'string' && slug.trim().length > 0) {
            router.push(slug);
            setDrawerOpen(false);
        } else {
            console.log('No valid slug for nav item:', slug);
        }
    }

    function renderNavItems(items: I_NavNode[], parentKey = '', parentNavTarget?: string): React.ReactNode {
        return items.map((item, i) => {
            const key = `${parentKey}item_${i}`;
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const navTarget = (typeof item.slug === 'string' && item.slug.trim().length > 0)
                ? item.slug
                : (typeof (item as any).path === 'string' && (item as any).path.trim().length > 0 ? (item as any).path : undefined);
            const isRoutable = typeof navTarget === 'string' && navTarget.trim().length > 0;
            const label = navTarget === '/' ? 'Home' : item.title;
            let filteredChildren = item.children;
            if (hasChildren && navTarget) {
                filteredChildren = item.children!.filter(child => {
                    const childNavTarget = (typeof child.slug === 'string' && child.slug.trim().length > 0)
                        ? child.slug
                        : (typeof (child as any).path === 'string' && (child as any).path.trim().length > 0 ? (child as any).path : undefined);
                    return childNavTarget !== navTarget;
                });
            }
            return (
                <Box key={key} sx={{ mb: 0 }}>
                    <ListItemButton
                        onClick={isRoutable ? (e) => {
                            e.preventDefault();
                            handleNavClick(navTarget);
                        } : undefined}
                        disabled={!isRoutable}
                        sx={!isRoutable ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                        <ListItemIcon>
                            <Icon icon={(item as any).icon ? (item as any).icon : "right"} color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItemButton>
                    {hasChildren && filteredChildren && filteredChildren.length > 0 && (
                        <List dense sx={{ ml: 2 }}>
                            {renderNavItems(sortNavItems(filteredChildren), key + '_', navTarget)}
                        </List>
                    )}
                </Box>
            );
        });
    }

    if (mode === 'mobile') {
        return (
            <>
                <IconButton color="inherit" onClick={() => setDrawerOpen(true)} aria-label="Open Nav">
                    <Icon icon='menu' color="primary" />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box sx={{ width: 250, mt: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                        <List dense component={'nav'}>
                            {renderNavItems(sortedNavItems)}
                        </List>
                    </Box>
                </Drawer>
            </>
        );
    }

    // Desktop mode
    return (
        <Box>
            <List dense component={'nav'}>
                {renderNavItems(sortedNavItems)}
            </List>
        </Box>
    );
};

export default Nav;
