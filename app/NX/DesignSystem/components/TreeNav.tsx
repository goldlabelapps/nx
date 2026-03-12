"use client";
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useRouter } from 'next/navigation';

function mapNavItemsToTreeView(items: any[], usedIds = new Set()): any[] {
    return items.map((item, idx) => {
        let baseId = item.path || item.slug || item.title || String(idx);
        let id = baseId;
        let suffix = 1;
        while (usedIds.has(id)) {
            id = `${baseId}_${suffix}`;
            suffix++;
        }
        usedIds.add(id);
        return {
            id,
            label: item.title,
            route: item.path || item.slug,
            children: item.children ? mapNavItemsToTreeView(item.children, usedIds) : undefined,
        };
    });
}

export default function TreeNav({ navItems = [] }: { navItems?: any[] }) {
    const router = useRouter();
    const treeViewItems = mapNavItemsToTreeView(navItems);
    return (
        <Box sx={{}}>
            <RichTreeView
                items={treeViewItems}
                onItemClick={(event, itemId) => {
                    // console.log('Clicked item ID:', event);
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
                    if (clickedItem && clickedItem.route) {
                        router.push(clickedItem.route);
                    }
                }}
            />
        </Box>
    );
}
