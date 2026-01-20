
# Goldlabel NX

```sh
yarn dev
```


```typescript
export type T_Frontmatter = {
    title?: string;
    description?: string;
    slug?: string;
    tags?: string;
    icon?: string;
    order?: number;
    image?: string;
    flickrSlug?: string;
    author?: string;
    price?: number;
    clickThru?: string;
};
```

> `lsof -i :1999 | awk 'NR>1 {print $2}' | xargs -r kill`