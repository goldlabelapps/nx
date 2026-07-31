"use client";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from '../../Uberedux';
import { navigateTo } from '../../DesignSystem';

function normalizeRoute(route?: string): string | undefined {
    if (typeof route !== 'string' || route.trim() === '') return undefined;
    if (route === '/') return '/';
    return route.replace(/\/+$/, '') || '/';
}

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
            // Recursively filter children, removing only duplicate index entries
            // where a child points to the same route as its parent.
            let filteredChildren = undefined;
            if (item.children && Array.isArray(item.children)) {
                const childrenWithoutDuplicateIndex = item.children.filter((child: any) => {
                    if (!route || typeof route !== 'string') return true;
                    const childRoute = child?.path || child?.slug;
                    return normalizeRoute(childRoute) !== normalizeRoute(route);
                });
                filteredChildren = mapNavItemsToTreeView(childrenWithoutDuplicateIndex, usedIds);
            }
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
    const dispatch = useDispatch();
    const pathname = usePathname();
    const treeViewItems = mapNavItemsToTreeView(navItems);

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

    // Find the id of the item matching the current pathname exactly
    function findCurrentId(items: any[]): string | undefined {
        for (const item of items) {
            if (item.route === pathname) return item.id;
            if (item.children) {
                const found = findCurrentId(item.children);
                if (found) return found;
            }
        }
        return undefined;
    }
    const currentItemId = findCurrentId(treeViewItems);

    return (
            <RichTreeView
                items={treeViewItems}
                defaultExpandedItems={defaultExpandedItems}
                selectedItems={currentItemId}
                isItemDisabled={(item: any) => item.id === currentItemId && (!item.children || item.children.length === 0)}
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
                    if (clickedItem && clickedItem.route && clickedItem.route !== pathname) {
                        dispatch(navigateTo(router, clickedItem.route));
                    }
                }}
            />
    );
}
