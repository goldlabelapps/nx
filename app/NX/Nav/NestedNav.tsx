import type { I_NestedNav } from "../types";
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
        <Box component={'nav'}
            sx={{
                display: 'block',
                textAlign: 'left',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
            }}
        >
            {sortedNavItems.map((item: any, i: number) => (
                <Box key={`item_${i}`}
                    sx={{ mb: 1 }}
                >
                    <Link href={item.path} passHref legacyBehavior={false}>
                        <Button
                            variant="contained"
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
                                    // Only include if the original filename is not index.md
                                    // Assume child.path is like /foo/bar or /foo/bar/index or /foo/bar/index.md
                                    return !/\/index(\.md)?$/.test(child.path);
                                })
                            ).map((child: any, j: number) => (
                                <Link href={child.path} passHref legacyBehavior={false} key={`child_${i}_${j}`}>
                                    <Button
                                        variant="outlined"
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
