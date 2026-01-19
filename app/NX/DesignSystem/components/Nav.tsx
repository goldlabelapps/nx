"use client";
import { useRouter } from 'next/navigation';
import { I_NavNode } from '../../types';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    ListItemButton,
    ListItemText
} from '@mui/material';

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

    function handleNavClick(slug?: string) {
        if (slug) router.push(slug);
    }

    function renderNavItems(items: I_NavNode[], parentKey = ''): React.ReactNode {
        return items
            .filter((item) => item.slug !== '/')
            .map((item, i) => {
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
        <Accordion sx={{ width: 300, maxWidth: '100%' }}>
            <AccordionSummary
                aria-controls="nav-content"
                id="nav-header"
            >
                Nav
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
