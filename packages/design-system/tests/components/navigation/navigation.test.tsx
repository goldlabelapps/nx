import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SiteNav from '../../../src/components/navigation/SiteNav';

describe('site navigation', () => {
  it('renders flat and nested items', () => {
    render(
      <SiteNav
        items={[
          { title: 'Home', slug: '/' },
          {
            title: 'Features',
            slug: '/features',
            children: [
              { title: 'Design System', slug: '/features/design-system' },
              { title: 'Storybook', slug: '/features/storybook' },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Features')).toBeTruthy();
    expect(screen.getByText('Design System')).toBeTruthy();
    expect(screen.getByText('Storybook')).toBeTruthy();
  });
});