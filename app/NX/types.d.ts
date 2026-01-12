// Naming conventions 
// Types start with T_ and interfaces with I_
export interface T_NX {
    children: React.ReactNode;
}

export type T_NavItem = {
    label: string;
    children?: T_NavItem[];
};

export interface I_NestedNav {
    navItems: T_NavItem[];
}
