import type { T_Tenant } from '../NX/types';
import { Metadata } from "next";
import { NXAdmin } from '../NX/NXAdmin';
import {
    getTenant,
} from '../NX/lib/index.server';

type T_Params = {
    slug?: string[];
};

const toAbsoluteUrl = (baseUrl: string, src?: string) => {
    if (!src) {
        return undefined;
    }
    if (/^https?:\/\//.test(src)) {
        return src;
    }
    return `${baseUrl}${src.startsWith('/') ? src : `/${src}`}`;
};

const formatSlugTitle = (slugPath: string) => slugPath
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replace(/[-_]+/g, ' '))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' / ');

export async function generateMetadata({ params }: { params?: Promise<T_Params> }): Promise<Metadata> {
    const resolvedParams = (await params) || {};
    const slugPath = Array.isArray(resolvedParams?.slug) && resolvedParams.slug.length
        ? resolvedParams.slug.join('/')
        : '';

    const tenant = process.env.NEXT_PUBLIC_TENANT || 'nxadmin';
    const { config } = getTenant(tenant as T_Tenant);

    const siteName = config.siteName || 'NX°Admin';
    const description = config.description || 'Level Five AI only';
    const baseUrl = (config.url).replace(/\/$/, '');
    const pageUrl = slugPath ? `${baseUrl}/${slugPath}` : baseUrl;
    const imageUrl = toAbsoluteUrl(baseUrl, config.images?.light);
    const pageTitle = slugPath ? `${formatSlugTitle(slugPath)}` : siteName;

    return {
        metadataBase: new URL(baseUrl),
        title: pageTitle,
        description,
        alternates: {
            canonical: slugPath ? `/${slugPath}` : '/',
        },
        openGraph: {
            type: 'website',
            siteName,
            title: pageTitle,
            description,
            url: pageUrl,
            images: imageUrl ? [{ url: imageUrl, alt: siteName }] : undefined,
        },
        twitter: {
            card: imageUrl ? 'summary_large_image' : 'summary',
            title: pageTitle,
            description,
            images: imageUrl ? [imageUrl] : undefined,
        },
    };
}


export default async function Page() {
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nxadmin";
    const { config: rawConfig } = getTenant(tenant as T_Tenant);
    const config = { ...rawConfig, tenant: tenant as T_Tenant };

    return <NXAdmin config={config} />;
}
