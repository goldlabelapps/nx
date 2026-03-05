export function mergeData(meta: any, data: any) {
    let mergedMeta = Object.fromEntries(
        Object.entries(meta).map(([key, value]) => [key, data && key in data ? data[key] : value])
    );
    if (data && data.title) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                title: data.title
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                title: data.title
            };
        }
    }
    if (data && data.description) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                description: data.description
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                description: data.description
            };
        }
    }
    if (data && data.siteName) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                siteName: data.siteName
            };
        }
        if (mergedMeta.twitter && typeof mergedMeta.twitter === 'object') {
            mergedMeta.twitter = {
                ...mergedMeta.twitter,
                site: data.siteName
            };
        }
    }
    if (data && data.url) {
        if (mergedMeta.openGraph && typeof mergedMeta.openGraph === 'object') {
            mergedMeta.openGraph = {
                ...mergedMeta.openGraph,
                url: data.url
            };
        }
    }
    return mergedMeta;
}