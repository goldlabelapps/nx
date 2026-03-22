"use client";
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthed } from '../../Paywall';

function mapNavItemsToTreeView(items: any[], usedIds = new Set()): any[] {
    return items
        .filter(item => !(item.hideInNav === true || item.hideInNav === 'true'))
        .map((item, idx) => {
            let baseId = item.path || item.slug || item.title || String(idx);
            let id = baseId;
            let suffix = 1;
            while (usedIds.has(id)) {
                id = `${baseId}_${suffix}`;
                suffix++;
            }
            usedIds.add(id);
            const route = item.path || item.slug;
            let label = item.title;
            if (route === "/") {
                label = "Home";
            }
            // Recursively filter children as well
            const filteredChildren = item.children ? mapNavItemsToTreeView(item.children, usedIds) : undefined;
            return {
                id,
                label,
                route,
                children: filteredChildren && filteredChildren.length > 0 ? filteredChildren : undefined,
            };
        });
}

export default function TreeNav({ navItems = [] }: { navItems?: any[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const treeViewItems = mapNavItemsToTreeView(navItems);
    const authed = useAuthed();
    let md = ``;

    if (authed)
        md = ``;

    const handleCTA = () => {
        router.push('/nx-admin');
    };

    // Helper to collect all node ids along the path to the current page
    function getExpandedIds(items: any[], pathname: string): string[] {
        let expanded: string[] = [];
        function traverse(nodes: any[], parentIds: string[] = []) {
            for (const node of nodes) {
                if (node.route && typeof node.route === 'string' && pathname.startsWith(node.route) && node.route !== '/') {
                    expanded = [...parentIds, node.id];
                    if (node.children) {
                        traverse(node.children, [...parentIds, node.id]);
                    }
                } else if (node.children) {
                    traverse(node.children, [...parentIds, node.id]);
                }
            }
        }
        traverse(items);
        return expanded;
    }

    const defaultExpandedItems = getExpandedIds(treeViewItems, pathname);

    return (
        <Box sx={{}}>
            <RichTreeView
                items={treeViewItems}
                defaultExpandedItems={defaultExpandedItems}
                onItemClick={(event, itemId) => {
                    function findItem(items: any[], id: string): any | undefined {
                        for (const item of items) {
                            if (item.id === id) return item;
                            if (item.children) {
                                const found = findItem(item.children, id);
                                if (found) return found;
                            }
                        }
                        return undefined;
                    }
                    const clickedItem = findItem(treeViewItems, itemId);
                    if (clickedItem && clickedItem.route && !clickedItem.children) {
                        router.push(clickedItem.route);
                    }
                }}
            />
        </Box>
    );
}
