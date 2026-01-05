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
    const featuredImage = doc?.frontmatter?.image || "/jpg/og_light.jpg";
    const title = doc?.frontmatter?.title || (slug.length > 0 && !doc ? currentPath : "A target you can see");
    const content = doc?.content;

    return (
        <div className="page-layout">
            <main className="page-content">
                <article>
                    <div className="mobile-featured-image">
                        <Image
                            src={featuredImage}
                            alt={doc?.frontmatter?.title || "Goldlabel"}
                            width={1200}
                            height={630}
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <h1>{title}</h1>
                    <h2>{doc?.frontmatter?.description || "A premium content platform designed for clarity and precision in digital publishing"}</h2>
                    {doc?.frontmatter?.description && (
                        <p className="description">{doc.frontmatter.description}</p>
                    )}
                    {doc && content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        <section>
                            <blockquote>
                                Welcome to Goldlabel - A modern, flexible content management system built with Next.js and Firestore.
                            </blockquote>
                            <p>
                                Goldlabel provides a powerful platform for managing and publishing content. Built on Next.js 16, it combines the performance of static generation with the flexibility of dynamic content.
                            </p>

                            <p>
                                The system integrates seamlessly with Firestore for content storage, allowing you to manage your content through a simple markdown-based interface while maintaining full control over your data.
                            </p>

                            <p>
                                Whether you're building a blog, documentation site, or content-rich application, Goldlabel provides the tools you need to create, manage, and publish your content with ease.
                            </p>

                            <p>
                                Get started by creating your first markdown document or explore the API to see how you can integrate Goldlabel into your workflow.
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
                    alt={doc?.frontmatter?.title || "Goldlabel"}
                    width={1024}
                    height={683}
                    priority
                    style={{ objectFit: 'cover' }}
                />
                <figcaption>{doc?.frontmatter?.title || "Target 2026"}</figcaption>
            </aside>
        </div>
    );
}
