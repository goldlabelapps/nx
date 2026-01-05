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
    const doc = slugString ? await getDocBySlug(slugString) : null;

    // Fetch all docs for navigation
    const allDocs = await getAllDocs();

    console.log('Current slug:', slugString);
    console.log('Doc found:', doc ? 'yes' : 'no');
    console.log('All docs count:', allDocs.length);
    if (allDocs.length > 0) {
        console.log('Sample doc:', allDocs[0]);
    }

    // Use doc data or fallback to defaults
    const featuredImage = doc?.frontmatter?.image || "https://live.staticflickr.com/65535/55022177232_15f5a45416_b.jpg";
    const title = doc?.frontmatter?.title || (slug.length > 0 && !doc ? currentPath : "Ordering Medical Cannabis Online in the UK");
    const content = doc?.content;

    return (
        <div className="page-layout">
            <main className="page-content">
                <article>
                    <div className="mobile-featured-image">
                        <Image
                            src={featuredImage}
                            alt={doc?.frontmatter?.title || "UK Medical Cannabis"}
                            width={1024}
                            height={683}
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <h1>{title}</h1>
                    {doc?.frontmatter?.description && (
                        <p className="description">{doc.frontmatter.description}</p>
                    )}
                    <pre style={{ padding: '1rem', overflow: 'auto' }}>
                        {JSON.stringify({
                            currentSlug: slugString,
                            docFound: !!doc,
                            doc: doc,
                            allDocsCount: allDocs.length,
                            sampleDoc: allDocs[0]
                        }, null, 2)}
                    </pre>
                    {doc && content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <section>
                            <blockquote>
                                UK medical cannabis ordered legally by prescription, supplied by licensed pharmacies, and delivered to your home. Clear information on how the process works and where orders come from.
                            </blockquote>
                            <p>
                                In the UK, medical cannabis can be supplied legally when it is prescribed as a cannabis-based product for medicinal use (a CBPM). Since 1 November 2018, qualifying CBPMs have been placed in Schedule 2, which means they can be prescribed and supplied under controlled conditions.
                            </p>

                            <p>
                                The key condition is the prescription. UK rules restrict the decision to prescribe CBPMs to doctors on the GMC Specialist Register. In practice, that usually means a specialist consultation (often done remotely), followed by a prescription where appropriate.
                            </p>

                            <p>
                                Once prescribed, supply works like other controlled medicines: it is dispensed through a pharmacy and can be delivered to you by courier. Many CBPMs are “unlicensed specials”, which are still lawful to supply when ordered for an individual patient and sourced through properly licensed manufacturers and suppliers.
                            </p>

                            <p>
                                What is not legal is buying cannabis as a consumer product without a prescription. This site exists for people using the legal route: prescription-led access, pharmacy dispensing, and home delivery — with clear information on the options available and where they come from.
                            </p>
                        </section>

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
                    alt={doc?.frontmatter?.title || "UK Medical Cannabis"}
                    width={1024}
                    height={683}
                    priority
                    style={{ objectFit: 'cover' }}
                />
                <figcaption>{doc?.frontmatter?.title || "Medical Cannabis greenhouse"}</figcaption>
            </aside>
        </div>
    );
}
