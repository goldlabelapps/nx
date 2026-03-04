import React from 'react';

interface SharePageProps {
    params: { slug: string };
}

// This is a server component by default
export default async function SharePage({ params }: SharePageProps) {
    const { slug } = await params;
    // You can fetch data here if needed (e.g., await fetch(...))
    return (
        <div>
            <h1>Share</h1>
            <p>slug: {slug}</p>
            <pre>{JSON.stringify(await params, null, 2)}</pre>
        </div>
    );
}
