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
    return (
        <nav className="goldlabel-nav">
            {renderNav(relabelHome(items))}
        </nav>
    );
};

export default Navigation;
