

import type { T_NavItem } from "../types";

type NestedNavProps = {
    navItems: T_NavItem[];
};

function NestedNav({ navItems }: NestedNavProps) {
    return (
        <nav>
            <ul>
                {navItems.map((item) => (
                    <li key={item.label}>
                        {item.label}
                        {item.children && (
                            <ul>
                                {item.children.map((child) => (
                                    <li key={child.label}>{child.label}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default NestedNav;
