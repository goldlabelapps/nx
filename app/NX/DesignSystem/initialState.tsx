
export type T_DesignSystem_State = {
    cartridge: string;
    themeMode: 'light' | 'dark';
};

export const initialState: T_DesignSystem_State = {
    cartridge: 'DesignSystem',
    themeMode: 'light',
};
