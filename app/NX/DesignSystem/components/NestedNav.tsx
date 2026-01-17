import type { I_NestedNav } from "../../types";
import { Box, Button } from '@mui/material';
import Link from 'next/link';

function sortNavItems(items: any[]) {
    return [...items].sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : 9999;
        const orderB = typeof b.order === "number" ? b.order : 9999;
        if (orderA !== orderB) return orderA - orderB;
        return a.title.localeCompare(b.title);
    });
}

function filterIndexMd(items: any[]) {
    return items.filter(item => {
        // Exclude index.md from children (usually path ends with /index or /index.md)
        return !/\/index(\.md)?$/.test(item.path);
    });
}

function NestedNav({ navItems }: I_NestedNav & { currentPath?: string }) {
    const sortedNavItems = sortNavItems(navItems);
    return (
        <Box component={'nav'}>
            {sortedNavItems
                .filter((item: any) => item.path !== '/')
                .map((item: any, i: number) => (
                    <Box key={`item_${i}`}
                        sx={{ mb: 1 }}
                    >
                        <Link href={item.path} passHref legacyBehavior={false}>
                            <Button
                                color="secondary"
                                variant="text"
                                title={item.description}
                                sx={{ mb: item.children ? 0.5 : 0 }}
                            >
                                {item.title}
                            </Button>
                        </Link>
                        {item.children && (
                            <Box sx={{ ml: 2, mt: 0.5 }}>
                                {sortNavItems(
                                    item.children.filter((child: { path: string }) => {
                                        // Exclude index.md, Home, and any child whose path matches the parent item's path
                                        if (/\/index(\.md)?$/.test(child.path)) return false;
                                        if (child.path === item.path) return false;
                                        if (child.path === '/') return false;
                                        return true;
                                    })
                                ).map((child: any, j: number) => (
                                    <Link href={child.path} passHref legacyBehavior={false} key={`child_${i}_${j}`}>
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            sx={{ mb: 0.5 }}
                                        >
                                            {child.title}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
        </Box>
    );
}

export default NestedNav;
