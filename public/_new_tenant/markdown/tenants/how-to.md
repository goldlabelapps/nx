---
order: 110
slug: /tenants/how-to
title: Create New
description: How to create a new tenant
tags: tenants, new, 
icon: new
---

#### NX tenants

- Duplicate and configure this `_new_tenant` folder, then add it to the 
tenant library here `/app/NX/lib/getTenant.tsx`


- To create a new tenant Duplicate and configure the `/public/_new_tenant` folder, 
then add it to the library here `/app/NX/lib/getTenant.tsx`

```typescript
import writingConfig from '../../../public/writing/config.json';

export type T_Tenant = 'nx' |
    'mcuk' |
    'echopay' |
    'edtech' | 
    'writing' | 
    'company'
;

export const getTenant = (tenant?: T_Tenant) => {
    const t = tenant || process.env.NEXT_PUBLIC_TENANT;
    let config;
    let markdownDir;

    switch (t) {
        case '_new_tenant':
            config = newTenantConfig;
            markdownDir = process.cwd() + '/public/_new_tenant/markdown';
            break;
```
