

// This is a server component by default
export default async function SharePage(props: PageProps<'/share/[slug]'>) {
    const params = await props.params;
    const { slug } = params;
    // You can fetch data here if needed (e.g., await fetch(...))
    return (
        <div>
            <h1>Share</h1>
            <p>slug: {slug}</p>
            <pre>{JSON.stringify(params, null, 2)}</pre>
        </div>
    );
}
