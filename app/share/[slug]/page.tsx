import { notFound } from 'next/navigation';
import {
    getTenant,
    getMeta,
} from '../../NX/lib';
import { getBaseurl } from '../../api';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tenant = await getTenant();
    // const { config } = tenant;

    const res = await fetch(`${getBaseurl()}/share/${slug}`);
    const data = await res.json();

    const { severity, message } = data?.meta || {};
    console.log('severity, message', severity, message);

    if (severity !== 'success') {
        notFound();
    }

    const meta = getMeta({});
    let mergedMeta = Object.fromEntries(
        Object.entries(meta).map(([key, value]) => [key, key in data.data ? data.data[key] : value])
    );

    // Special handling for openGraph and twitter fields
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
            <pre>mergedMeta: {JSON.stringify(mergedMeta, null, 2)}</pre>
        </div>
    );
}
