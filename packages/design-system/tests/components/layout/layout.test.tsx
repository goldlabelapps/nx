import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShell, PageSection, SectionTitle } from '../../../src/components/layout/Layout';
import Header from '../../../src/components/layout/Header';
import Main from '../../../src/components/layout/Main';
import Footer from '../../../src/components/layout/Footer';
import { DesktopOnly } from '../../../src/components/responsive/Viewport';

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
  it('renders desktop-only content without waiting for a later effect cycle', () => {
    render(
      <DesktopOnly fallback={<div>fallback</div>}>
        <div>desktop content</div>
      </DesktopOnly>
    );

    expect(screen.getByText('desktop content')).toBeTruthy();
  });

  it('renders header title link', () => {
    render(
      <Header
        title="Docs"
        description="Description copy"
        homeHref="/"
        logoSrc="/logo.png"
        navItems={<div>Nav</div>}
      />
    );
    expect(screen.getByRole('link', { name: 'Go to Docs home' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Docs' })).toBeTruthy();
  });

  it('renders main with and without featured image', () => {
    const { rerender, container } = render(
      <Main featuredImage="/hero.png">
        <h2>Hero section</h2>
      </Main>
    );
    expect(screen.getByText('Hero section')).toBeTruthy();
    expect(container.querySelector('img[src="/hero.png"]')).toBeTruthy();

    rerender(
      <Main>
        <h2>Plain section</h2>
      </Main>
    );
    expect(screen.getByText('Plain section')).toBeTruthy();
  });

  it('renders footer link groups', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'About' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Design System' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'NextJS' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeTruthy();
  });
});