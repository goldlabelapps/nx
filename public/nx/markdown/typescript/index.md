---
order: 20
slug: /typescript
title: TypeScript
description: types.d.ts
tags: NX, TypeScript
icon: js
---

```typescript
export type T_Config = {
    tenant: T_Tenant;
    siteName: string;
    label?: string;
    description: string;
    url: string;
    icons: {
        light: {
            icon: string;
            favicon: string;
        };
        dark: {
            icon: string;
            favicon: string;
        };
    };
    images: {
        light: string;
        dark: string;
    };
    cartridges: {
        paywall?: {
            enabled: boolean;
            userMode: string;
            email: string;
        };
        designSystem?: {
            themeSwitching: boolean;
            defaultTheme: string;
            themes: {
                [key: string]: {
                    mode: string;
                    primary: string;
                    secondary: string;
                    background: string;
                    paper: string;
                    text: string;
                    border: string;
                };
            };
        };
        lingua?: T_LinguaCartridge;
        // Add other cartridge types as needed
    };
}
```