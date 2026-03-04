

// This is a server component by default
export default async function SharePage(props: any) {
    const params = props.params;
    const { slug } = params;

    // Fetch data from the API route
    const res = await fetch(`http://localhost:1999/api/share/${slug}`);
    const data = await res.json();

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
