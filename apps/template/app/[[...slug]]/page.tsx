import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppShell, Card, Header, PageSection } from '@nx/design-system';
import ReactMarkdown from 'react-markdown';
import RoutedSiteNav from '../RoutedSiteNav';
import {
  getMarkdownNavItems,
  getMarkdownPageBySlug,
  getMarkdownStaticParams,
} from '../lib/markdown';

type PageParams = {
  slug?: string[];
};

type PageProps = {
  params: Promise<PageParams>;
};

export function generateStaticParams() {
  return getMarkdownStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = Array.isArray(resolved.slug) ? resolved.slug : [];
  const page = getMarkdownPageBySlug(slug);

  if (!page) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: page.title,
    description: page.description || 'Template SSG page',
  };
}

export default async function MarkdownPage({ params }: PageProps) {
  const resolved = await params;
  const slug = Array.isArray(resolved.slug) ? resolved.slug : [];
  const page = getMarkdownPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const navItems = getMarkdownNavItems();

  return (
    <AppShell>
      <Header
        title="NX° Template"
        actions={<RoutedSiteNav items={navItems} />}
      />

      <PageSection title={page.title} subtitle={page.description}>
        <Card>
          <ReactMarkdown>{page.content}</ReactMarkdown>
        </Card>
      </PageSection>
    </AppShell>
  );
}