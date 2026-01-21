
export type T_DesignSystem_State = {
    cartridge: string;
    themeMode: 'light' | 'dark';
    project: string;
};

export function initialStateDesignSystem(config: any): T_DesignSystem_State {
    return {
        cartridge: 'DesignSystem',
        themeMode: 'light',
        project: (config && config.project) || process.env.NEXT_PUBLIC_PROJECT || "nx",
    };
}
