"use client";
import Link from 'next/link';
import { I_NavNode } from '../../types';
import {
    Box,
    List,
    ListItemButton
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
    const sortedNavItems = sortNavItems(navItems);
    return (
        <Box component={'nav'}>
            {sortedNavItems
                .filter((item: any) => item.path !== '/')
                .map((item: any, i: number) => (
                    <Link href={item.path} passHref key={`item_${i}`} style={{ textDecoration: 'none' }}>
                        <ListItemButton sx={{ mb: 1 }}>
                            {item.title}
                        </ListItemButton>
                    </Link>
                ))
            }
        </Box >
    );
}

export default Nav;
