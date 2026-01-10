
import React from "react";
import Link from "next/link";
import type { INavNode, IContextualNavigationProps } from "../types";

function findPathToNode(node: INavNode, targetSlug: string, path: INavNode[] = []): INavNode[] | null {
    if (node.slug === targetSlug) return [...path, node];
    if (node.children) {
        for (const child of node.children) {
            const found = findPathToNode(child, targetSlug, [...path, node]);
            if (found) return found;
        }
    }
    return null;
}

const ContextualNavigation: React.FC<IContextualNavigationProps> = ({ rootNode, currentSlug }) => {
    const normalizedCurrent = currentSlug.startsWith("/") ? currentSlug : `/${currentSlug}`;
    const path = findPathToNode(rootNode, normalizedCurrent);

    const homeLink = (
        <li key="home">
            <Link href="/" target="_self">Home</Link>
        </li>
    );

    if (!path || path.length === 0) {
        return (
            <ul>
                {homeLink}
                {rootNode.children?.map((child) => {
                    const clean = child.slug?.replace(/^\/+/, '');
                    return (
                        <li key={child.slug}>
                            <Link href={`/${clean ?? ''}`} target="_self">
                                {child.title ?? clean}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }

    const currentNode = path[path.length - 1];
    const parentNode = path.length > 1 ? path[path.length - 2] : null;

    return (
        <ul>
            {homeLink}
            {/* Breadcrumb path (ancestors) */}
            {path.slice(1, -1).map((ancestor) => {
                const clean = ancestor.slug?.replace(/^\/+/, '');
                return (
                    <li key={ancestor.slug} style={{ fontWeight: 'normal', opacity: 0.7 }}>
                        <Link href={`/${clean ?? ''}`} target="_self">
                            {ancestor.title ?? clean}
                        </Link>
                    </li>
                );
            })}
            {/* Current page (disabled) */}
            <li key={currentNode.slug} style={{ fontWeight: 'bold' }}>
                <span style={{ cursor: 'default', opacity: 0.9 }}>
                    {currentNode.title ?? currentNode.slug}
                </span>
            </li>
            {/* Siblings of current page (no label) */}
            {parentNode?.children && (
                <>
                    {parentNode.children
                        .filter((sibling) => sibling.slug !== currentNode.slug)
                        .map((sibling) => {
                            const clean = sibling.slug?.replace(/^\/+/, '');
                            return (
                                <li key={sibling.slug} style={{ marginLeft: 12 }}>
                                    <Link href={`/${clean ?? ''}`} target="_self">
                                        {sibling.title ?? clean}
                                    </Link>
                                </li>
                            );
                        })}
                </>
            )}
            {/* Children of current page (no label) */}
            {currentNode.children && currentNode.children.length > 0 && (
                <>
                    {currentNode.children.map((child) => {
                        const clean = child.slug?.replace(/^\/+/, '');
                        return (
                            <li key={child.slug} style={{ marginLeft: 12 }}>
                                <Link href={`/${clean ?? ''}`} target="_self">
                                    {child.title ?? clean}
                                </Link>
                            </li>
                        );
                    })}
                </>
            )}
        </ul>
    );
};

export default ContextualNavigation;
