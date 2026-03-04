import { notFound } from 'next/navigation';
import {
    getTenant,
    getMeta,

} from '../../NX/lib';
import { getBaseurl } from '../../api';

export default async function Page(
    { params }: { params: Promise<{ slug: string }> }
) {
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

    const meta = getMeta({
    });

    return (
        <div>
            <pre>meta: {JSON.stringify(meta, null, 2)}</pre>
            <pre>data: {JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
