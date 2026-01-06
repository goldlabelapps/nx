
import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getDocBySlug, getAllDocs } from "@/goldlabel/lib/firestore-service";


interface PageProps {
    params: Promise<{
        slug?: string[];
    }>;
}

// Generate static paths at build time
export async function generateStaticParams() {
    try {
        const slugs = await getAllSlugs();

        // Convert slugs to slug arrays for catch-all routes
        return slugs.map(slug => ({
            slug: slug.split('/').filter(Boolean)
        }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug || [];
    const currentPath = slug.length > 0 ? `/${slug.join("/")}` : "/";


    // Fetch document data from Firestore
    const slugString = slug.join('/');
    let doc = slugString ? await getDocBySlug(slugString) : null;
    let is404 = false;

    // If no doc found, fetch the 404 doc from Firestore
    if (!doc) {
        doc = await getDocBySlug('404');
        is404 = true;
    }

    // Fetch all docs for navigation
    const allDocs = await getAllDocs();

    // Use doc data or fallback to minimal defaults (no identifying text)
    const featuredImage = doc?.frontmatter?.image || "/png/og.png";
    const title = doc?.frontmatter?.title ? doc.frontmatter.title : "";
    const description = doc?.frontmatter?.description ? doc.frontmatter.description : "";
    const content = doc?.content;

    // If homepage markdown is missing, show setup form
    if (!content && currentPath === "/") {
        const HomeInstallClient = (await import("./HomeSetupClient")).default;
        return (
            <div className="page-layout">
                <main className="page-content">
                    <article>
                        <div className="mobile-featured-image">
                            <Image
                                src={featuredImage}
                                alt={doc?.frontmatter?.title || ""}
                                width={1200}
                                height={630}
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <HomeInstallClient />
                    </article>
                </main>
                <aside className="featured-image">
                    <Image
                        src={featuredImage}
                        alt={doc?.frontmatter?.title || ""}
                        width={1024}
                        height={683}
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                    {doc?.frontmatter?.title && <figcaption>{doc.frontmatter.title}</figcaption>}
                </aside>
            </div>
        );
    }

    return (
        <div className="page-layout">
            <main className="page-content">
                <article>
                    <div className="mobile-featured-image">
                        <Image
                            src={featuredImage}
                            alt={doc?.frontmatter?.title || ""}
                            width={1200}
                            height={630}
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    {title ? <h1>{title}</h1> : null}
                    {description ? <h2>{description}</h2> : null}
                    {description ? <p className="description">{description}</p> : null}
                    {content && (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                    {doc?.frontmatter && (
                        <div className="metadata">
                            {doc.frontmatter.author && <p>By {doc.frontmatter.author}</p>}
                            {doc.frontmatter.tags && (
                                <p>Tags: {doc.frontmatter.tags}</p>
                            )}
                        </div>
                    )}
                </article>
            </main>

            <aside className="featured-image">
                <Image
                    src={featuredImage}
                    alt={doc?.frontmatter?.title || ""}
                    width={1024}
                    height={683}
                    priority
                    style={{ objectFit: 'cover' }}
                />
                {doc?.frontmatter?.title && <figcaption>{doc.frontmatter.title}</figcaption>}
            </aside>
        </div>
    );
}
