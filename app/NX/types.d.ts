// Naming conventions 
// Types start with T_ and interfaces with I_
export interface T_NX {
    children: React.ReactNode;
}


export interface I_NestedNav {
    navItems: T_NavItem[];
}

export type T_NavItem = {
    title: string;
    path: string;
    order?: number;
    children?: T_NavItem[];
};

