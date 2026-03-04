import {
    getTenant,
    getMeta,
} from '../../NX/lib'
import { } from '../../NX/lib/getMeta';

// 
export default async function SharePage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const tenant = await getTenant();
    // const { config } = tenant;
    const res = await fetch(`http://localhost:1999/api/share/${slug}`);
    const data = await res.json();

    const meta = getMeta({
    });

    return (
        <div>
            <h1>SharePage</h1>
            <pre>meta: {JSON.stringify(meta, null, 2)}</pre>
            <pre>data: {JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
