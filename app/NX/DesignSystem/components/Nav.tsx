"use client";
import React from 'react';
import type { I_Icon } from '../../types';
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
import { Commerce } from '../../Commerce';

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
    config: any;
}

const Nav: React.FC<I_Nav> = ({
    navItems,
    currentPath,
    mode = 'desktop',
    config,
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
        return items
            .filter(item => {
                // Hide Home link if on homepage
                const navTarget = (typeof item.slug === 'string' && item.slug.trim().length > 0)
                    ? item.slug
                    : (typeof (item as any).path === 'string' && (item as any).path.trim().length > 0 ? (item as any).path : undefined);
                if (navTarget === '/' && (currentPath === '/' || currentPath === '' || currentPath === undefined)) {
                    return false;
                }
                return true;
            })
            .map((item, i) => {
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
                            {/* {item.icon && typeof item.icon === 'string' && (
                                <ListItemIcon>
                                    {([
                                        'more', 'free', 'writing', 'books', 'ski', 'skiing', 'typescript', 'van', 'fullstack', 'web3d', 'rocket', 'logs', 'dashboard', 'bike', 'user', 'visitors', 'visitor', 'ki', 'users', 'pdf', 'tick', 'case', 'caseclosed', 'cases', 'caseclock', 'upload', 'plus', 'dog', 'about', 'experience', 'clients', 'link', 'album', 'flickr', 'photo', 'film', 'preview', 'add', 'account', 'download', 'job', 'copy', 'linkedin', 'core', 'cartridge', 'uberedux', 'good-fit', 'products', 'flash', 'speak-write', 'admin', 'private', 'company', 'feature', 'auth', 'design', 'ai', 'ask', 'forget', 'folder', 'fingerprint', 'fallmanager', 'youtube', 'boot', 'hide', 'show', 'save', 'filters', 'filter', 'fullscreen', 'examples', 'signup', 'what', 'when', 'who', 'how', 'legal', 'geo', 'docker', 'scuba', 'js', 'javascript', 'oliver', 'life', 'balance', 'bug', 'geolocator', 'google', 'lingua', 'plugin', 'doc', 'reset', 'accommodation', 'spy', 'seed', 'github', 'members', 'notifyer', 'notifyr', 'pingpong', 'close', 'bus', 'darkmode', 'lightmode', 'pool', 'boat', 'car', 'bar', 'shop', 'home', 'fish', 'mobile', 'blog', 'search', 'cancel', 'delete', 'techstack', 'backoffice', 'edit', 'example', 'goldlabel', 'wordpress', 'where', 'whatsapp', 'expand', 'web', 'twitter', 'facebook', 'ting', 'settings', 'team', 'email', 'contact', 'share', 'leaf', 'star', 'food', 'medical', 'scooter', 'diveshop', 'diving', 'news', 'aicase', 'activities', 'left', 'down', 'up', 'sitemap', 'right', 'menu', 'success', 'categories', 'category', 'tings', 'info', 'warning', 'error', 'signout', 'api', 'work', 'macos', 'signin', 'blokey', 'android', 'openai', 'chrome', 'desktop', 'desktopmac', 'edge', 'linux', 'windows', 'xbox', 'mac', 'why', 'iphone', 'paywall', 'safari', 'firefox', 'plugins', 'files', 'expertise', 'tags', 'terminal', 'bouncer'
                                    ].includes(item.icon)) ? (
                                        <Icon icon={item.icon as any} color="primary" />
                                    ) : null}
                                </ListItemIcon>
                            )} */}
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
                    <Box sx={{ width: 300, mt: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                        <List dense component={'nav'}>
                            {renderNavItems(sortedNavItems)}
                        </List>
                        <Box sx={{ m: 1 }}>
                            <Commerce config={config} />
                        </Box>
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
