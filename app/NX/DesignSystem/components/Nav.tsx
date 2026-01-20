"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { I_NavNode } from '../../types';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

function sortNavItems(items: any[]) {
    return [...items].sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : 9999;
        const orderB = typeof b.order === "number" ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
    });
}


function Nav({ navItems }: { navItems: I_NavNode[]; currentPath?: string }) {
    const router = useRouter();
    const sortedNavItems = sortNavItems(navItems);
    const theme = useTheme();
    // true if screen is medium or larger (desktop)
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const [expanded, setExpanded] = React.useState(isDesktop);

    // Update expanded state when screen size changes
    React.useEffect(() => {
        setExpanded(isDesktop);
    }, [isDesktop]);


    function handleNavClick(slug?: string) {
        if (typeof slug === 'string' && slug.trim().length > 0) {
            router.push(slug);
        } else {
            console.log('No valid slug for nav item:', slug);
        }
    }

    function renderNavItems(items: I_NavNode[], parentKey = '', parentNavTarget?: string): React.ReactNode {
        return items.map((item, i) => {
            const key = `${parentKey}item_${i}`;
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            // Use slug if present, otherwise path (for compatibility with NavItem from getNav)
            const navTarget = (typeof item.slug === 'string' && item.slug.trim().length > 0)
                ? item.slug
                : (typeof (item as any).path === 'string' && (item as any).path.trim().length > 0 ? (item as any).path : undefined);
            const isRoutable = typeof navTarget === 'string' && navTarget.trim().length > 0;
            // If this is the home page, label as Home
            const label = navTarget === '/' ? 'Home' : item.title;
            // Filter out children whose navTarget matches this navTarget (i.e., index page)
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
                <Box key={key} sx={{ mb: 1 }}>
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
                            {renderNavItems(sortNavItems(filteredChildren), key + '_', navTarget)}
                        </List>
                    )}
                </Box>
            );
        });
    }

    return (
        <Accordion expanded={expanded} onChange={(_, exp) => setExpanded(exp)}>
            <AccordionSummary
                aria-controls="nav-content"
                id="nav-header"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <ListItemIcon sx={{ minWidth: 32, mr: 1 }}>
                    <MenuIcon />
                </ListItemIcon>

            </AccordionSummary>
            <AccordionDetails>
                <List component={'nav'}>
                    {renderNavItems(sortedNavItems)}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

export default Nav;
