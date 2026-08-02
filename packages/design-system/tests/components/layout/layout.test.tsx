import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShell, PageSection, SectionTitle } from '../../../src/components/layout/Layout';
import Header from '../../../src/components/layout/Header';
import Main from '../../../src/components/layout/Main';
import Sidebar from '../../../src/components/layout/Sidebar';
import Footer from '../../../src/components/layout/Footer';

describe('layout primitives', () => {
  it('renders shell and page section content', () => {
    render(
      <AppShell>
        <PageSection title="Section title" subtitle="Section subtitle">
          <SectionTitle title="Nested title" subtitle="Nested subtitle" />
        </PageSection>
      </AppShell>
    );

    expect(screen.getByText('Section title')).toBeTruthy();
    expect(screen.getByText('Section subtitle')).toBeTruthy();
    expect(screen.getByText('Nested title')).toBeTruthy();
  });
});

describe('site layout components', () => {
  it('renders header description text', () => {
    render(
      <Header
        title="Docs"
        description="Description copy"
        homeHref="/"
        logoSrc="/logo.png"
        navItems={<div>Nav</div>}
      />
    );
    expect(screen.getByText('Description copy')).toBeTruthy();
  });

  it('renders main with and without featured image', () => {
    const { rerender, container } = render(
      <Main featuredImage="/hero.png">
        <h2>Hero section</h2>
      </Main>
    );
    expect(screen.getByText('Hero section')).toBeTruthy();
    expect(container.querySelector('img.site-featured-image-bg')).toBeTruthy();

    rerender(
      <Main>
        <h2>Plain section</h2>
      </Main>
    );
    expect(screen.getByText('Plain section')).toBeTruthy();
  });

  it('renders sidebar defaults and custom content', () => {
    const { rerender } = render(<Sidebar />);
    expect(screen.getByText('Placeholder')).toBeTruthy();

    rerender(<Sidebar title="Release" text="v1.0.0" />);
    expect(screen.getByText('Release')).toBeTruthy();
    expect(screen.getByText('v1.0.0')).toBeTruthy();
  });

  it('renders footer link groups', () => {
    render(<Footer />);
    expect(screen.getByText('Company')).toBeTruthy();
    expect(screen.getByText('Features')).toBeTruthy();
    expect(screen.getByText('Techstack')).toBeTruthy();
    expect(screen.getByText('Download')).toBeTruthy();
  });
});