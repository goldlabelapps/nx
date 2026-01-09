import React from "react";

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
                <a href={item.path}>{item.title}</a>
                {item.children && item.children.length > 0 && renderNav(item.children)}
            </li>
        ))}
    </ul>
);

const Navigation: React.FC<NavigationProps> = ({ items }) => (
    <nav>
        {renderNav(items)}
    </nav>
);

export default Navigation;
