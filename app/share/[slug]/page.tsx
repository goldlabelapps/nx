import { notFound } from 'next/navigation';
import { Metadata } from "next";
import {
    // getTenant,
    getMeta,
} from '../../NX/lib';
import { getBaseurl } from '../../api';
import {
    Virus,
} from '../../NX/Virus';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {

    const { slug } = await params;
    //const tenant = await getTenant();
    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();
    const { severity } = data?.meta || {};


    const meta = getMeta({});
    let mergedMeta = Object.fromEntries(
        Object.entries(meta).map(([key, value]) => [
            key,
            data.data && key in data.data ? data.data[key] : value
        ])
    );

    if (data.data && data.data.title) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                title: data.data.title
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                title: data.data.title
            };
        }
    }
    if (data.data && data.data.description) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                description: data.data.description
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                description: data.data.description
            };
        }
    }
    if (data.data && data.data.siteName) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                siteName: data.data.siteName
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                site: data.data.siteName
            };
        }
    }
    if (data.data && data.data.url) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                url: data.data.url
            };
        }
    }

    return mergedMeta;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    //const tenant = await getTenant();
    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();
    const { severity } = data?.meta || {};

    if (severity !== 'success') {
        notFound();
    }

    // Generate mergedMeta before rendering
    const meta = getMeta({});
    let mergedMeta = Object.fromEntries(
        Object.entries(meta).map(([key, value]) => [key, key in data.data ? data.data[key] : value])
    );
    if (data.data.title) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                title: data.data.title
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                title: data.data.title
            };
        }
    }
    if (data.data.description) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                description: data.data.description
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                description: data.data.description
            };
        }
    }
    if (data.data.siteName) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                siteName: data.data.siteName
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                site: data.data.siteName
            };
        }
    }
    if (data.data.url) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                url: data.data.url
            };
        }
    }

    return (
        <div>
            {/* <pre>mergedMeta: {JSON.stringify(mergedMeta, null, 2)}</pre> */}
            <div>
                {/* <pre>meta: {JSON.stringify(mergedMeta, null, 2)}</pre> */}
                <h1>{data.data.title}</h1>
                <p>{data.data.description}</p>
                <div>{data.data.text}</div>
                <div>
                    <strong>/</strong> {data.data.slug}
                </div>
                <div>
                    <strong>Tenant:</strong> {data.data.tenant}
                </div>
                <div>
                    <strong>Markdown:</strong>
                    <pre>{data.data.markdown}</pre>
                </div>
            </div>
            <Virus meta={mergedMeta} />
        </div>
    );
}
