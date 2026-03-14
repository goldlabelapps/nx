"use client";
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useRouter } from 'next/navigation';
import {Surface} from '../../DesignSystem';

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
    const md = `Surfacing content...`;

    const handleCTA = () => {
        // console.log('CTA clicked!');
    };

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
                    // Only navigate if the clicked item is a leaf node (no children)
                    if (clickedItem && clickedItem.route && !clickedItem.children) {
                        router.push(clickedItem.route);
                    }
                }}
            />

            <Box sx={{ maxWidth: 300, m: 2 }}>
                <Surface options={{
                    id: 'surface',
                    label: 'Sign in',
                    icon: 'rocket',
                    markdown: md,
                    onClick: handleCTA,
                    onFinish: () => {
                        // console.log('done.');
                    }
                }}
                />
            </Box>

        </Box>
    );
}
