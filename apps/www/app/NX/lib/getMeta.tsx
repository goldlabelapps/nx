// import type { I_Meta } from '../types';
import { getTenant } from './getTenant';

export const getMeta = (props: any) => {

    const tenant = getTenant();
    const { config } = tenant;

    const meta: any = {
        siteName: props?.siteName ?? config.siteName ?? '',
        title: props?.title ?? config.siteName ?? '',
        description: props?.description ?? config.description ?? '',
        image: props?.image ?? config.images?.light ?? '',
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
            images: meta.image ? [{ url: meta.image }] : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: meta.title,
            description: meta.description,
            images: meta.image ? [meta.image] : [],
            site: meta.siteName,
        },
    }
};
