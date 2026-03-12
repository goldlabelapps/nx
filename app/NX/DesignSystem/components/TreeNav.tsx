"use client";
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useRouter } from 'next/navigation';

const MUI_X_PRODUCTS = [
    {
        id: 'grid',
        label: 'Data Grid',
        children: [
            { id: 'grid-community', label: '@mui/x-data-grid' },
            { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
            { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
        ],
    },
    {
        id: 'tree-view',
        label: 'Tree View',
        children: [
            { id: 'tree-view-community', label: '@mui/x-tree-view' },
            { id: 'tree-view-pro', label: '@mui/x-tree-view-pro' },
        ],
    },
];

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

export default function TreeNav({ navItems = MUI_X_PRODUCTS }: { navItems?: any[] }) {
    const router = useRouter();
    const treeViewItems = mapNavItemsToTreeView(navItems);
    return (
        <Box sx={{}}>
            <RichTreeView
                items={treeViewItems}
                onItemClick={(event, item) => {
                    if (item.route) {
                        router.push(item.route);
                    }
                }}
            />
        </Box>
    );
}
