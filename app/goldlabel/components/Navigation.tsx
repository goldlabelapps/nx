import React from "react";
import Link from "next/link";

export interface NavItem {
    title: string;
    path: string;
    children?: NavItem[];
}

interface NavigationProps {
    items: NavItem[];
}



// Remove redundant child index links (e.g., budbuddies/index.md under budbuddies/)
const filterRedundantIndex = (items: NavItem[], parentPath: string = ""): NavItem[] => {
    return items
        .filter(item => {
            // If this is a folder index (e.g., /budbuddies) and parent already has this path, skip
            if (parentPath && item.path === parentPath) return false;
            return true;
        })
        .map(item =>
            item.children && item.children.length > 0
                ? { ...item, children: filterRedundantIndex(item.children, item.path) }
                : item
        );
};

const renderNav = (items: NavItem[]) => (
    <ul>
        {items.map((item) => (
            <li key={item.path}>
                <Link href={item.path}>{item.title}</Link>
                {item.children && item.children.length > 0 && renderNav(item.children)}
            </li>
        ))}
    </ul>
);

const Navigation: React.FC<NavigationProps> = ({ items }) => {
    // Map items, replacing the label for the root ("/") with "Home"
    const relabelHome = (navItems: NavItem[]): NavItem[] =>
        navItems.map(item => {
            if (item.path === "/") {
                return { ...item, title: "Home" };
            }
            return item.children ? { ...item, children: relabelHome(item.children) } : item;
        });
    // Remove redundant child index links before rendering
    const cleaned = filterRedundantIndex(relabelHome(items));
    return (
        <nav className="goldlabel-nav">
            {renderNav(cleaned)}
        </nav>
    );
};

export default Navigation;
