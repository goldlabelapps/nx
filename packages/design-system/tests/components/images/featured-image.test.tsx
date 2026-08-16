import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import FeaturedImage from '../../../src/components/images/FeaturedImage/FeaturedImage';

describe('FeaturedImage', () => {
  const captionText = 'A scenic hero image';

  afterEach(() => {
    cleanup();
  });

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

  it('renders the image immediately without a loading skeleton', () => {
    render(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: captionText }}
      />,
    );

    expect(screen.queryByTestId('featured-image-skeleton')).toBeNull();
    expect(screen.queryByTestId('featured-image-src-overlay')).toBeNull();
    expect(screen.getByAltText(captionText)).toBeTruthy();
  });

  it('shows an error icon over the skeleton when the image fails', async () => {
    render(
      <FeaturedImage
        image={{ src: 'https://example.com/hero.jpg', alt: captionText }}
      />,
    );

    const image = screen.getByAltText(captionText);
    fireEvent.error(image);

    await waitFor(() => {
      const errorOverlay = screen.getByTestId('featured-image-error');
      expect(errorOverlay).toBeTruthy();
      expect(within(errorOverlay).getByText('https://example.com/hero.jpg')).toBeTruthy();
    });
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
