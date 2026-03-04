// import type { T_Tenant } from '../types';
import { getTenant } from './';

export interface I_Meta {
    siteName?: string;
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const getMeta = (props: I_Meta) => {

    const tenant = getTenant();
    const { config } = tenant;

    const meta: I_Meta = {
        siteName: props?.siteName ?? config.title ?? '',
        title: props?.title ?? config.title ?? '',
        description: props?.description ?? config.description ?? '',
        image: props?.image ?? config.image ?? '',
        url: props?.url ?? config.url ?? '',
    }

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: meta.url,
            siteName: meta.siteName,
            images: [meta.image],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
            images: [meta.image],
            site: meta.siteName,
        },
    }
};
