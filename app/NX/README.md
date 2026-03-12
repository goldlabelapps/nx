```typescript
export type T_Config = {
    project: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    image: string;
    icon: string;
    darkIcon?: string;
    email?: {
        label?: string;
        address: string;
    };
    cartridges: {
        commerce?: T_CommerceCartridge;
        designSystem?: T_DesignSystemCartridge;
        uberedux?: T_UbereduxCartridge;
        echopay?: T_EchoPayCartridge;
        lingua?: T_LinguaCartridge;
    };
}
```


```js
const MUI_X_PRODUCTS = [
    {
        id: 'grid',
        label: 'Data Grid',
        children: [
            { id: 'grid-community', label: '@mui/x-data-grid' },
            { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
            { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
        ],
    }
];
```