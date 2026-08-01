import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FeaturedImage from '../../../src/components/images/FeaturedImage';

describe('FeaturedImage', () => {
  it('renders the provided image source and alt text', () => {
    render(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: 'A scenic hero image' }}
      />,
    );

    const image = screen.getByAltText('A scenic hero image');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('https://example.com/hero.jpg');
  });
});
