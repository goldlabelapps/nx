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
        if (slug) router.push(slug);
    }

    function renderNavItems(items: I_NavNode[], parentKey = ''): React.ReactNode {
        return items.map((item, i) => {
            const key = `${parentKey}item_${i}`;
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            return (
                <Box key={key} sx={{ mb: 1 }}>
                    <ListItemButton onClick={() => handleNavClick(item.slug)}>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                    {hasChildren && (
                        <List sx={{ ml: 2 }}>
                            {renderNavItems(sortNavItems(item.children!), key + '_')}
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
                    {/* Home link at the top */}
                    <ListItemButton onClick={() => handleNavClick('/')}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    {renderNavItems(sortedNavItems)}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

export default Nav;
