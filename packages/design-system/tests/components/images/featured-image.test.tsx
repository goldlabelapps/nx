import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FeaturedImage from '../../../src/components/images/FeaturedImage';

describe('FeaturedImage', () => {
  const captionText = 'A scenic hero image';

  it('renders the provided image source and alt text', () => {
    render(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: captionText }}
      />,
    );

    const image = screen.getByAltText(captionText);
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('https://example.com/hero.jpg');
    expect(screen.getByText(captionText)).toBeTruthy();
  });

  it('does not render caption when alt is empty or whitespace', () => {
    const absentCaptionText = 'Caption should not appear';

    const { rerender } = render(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: '' }}
      />,
    );

    expect(screen.queryByText(absentCaptionText)).toBeNull();

    rerender(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: '   ' }}
      />,
    );

    expect(screen.queryByText(absentCaptionText)).toBeNull();
  });

  it('does not throw when alt is null', () => {
    const { container } = render(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: null }}
      />,
    );

    const image = container.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.getAttribute('alt')).toBe('');
  });
});
