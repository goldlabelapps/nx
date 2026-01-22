## Goldlabel NX

Create a new project in /public based on the ones you find there. Create your .env file and configure 

```typescript
export type T_Config = {
    project: string;
    title: string;
    description: string;
    url: string;
    favicon: string;
    image: string;
    icon: string;
    cartridges: {
        uberedux?: T_UbereduxCartridge;
        designSystem?: T_DesignSystemCartridge;
        images?: T_ImagesCartridge;
        commerce?: T_CommerceCartridge;
    };
};
```
