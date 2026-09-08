import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import FeaturedImage from '../../../src/design-system/components/images/FeaturedImage/FeaturedImage';
import DesignSystemProvider from '../../../src/design-system/components/DesignSystemProvider/DesignSystemProvider';

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
  });

  it('returns null when image source is undefined and slug cannot be resolved', () => {
    const { container } = render(
      <FeaturedImage
        slug="non-existent-slug"
        manifest={{ items: [] }}
      />,
    );

    expect(container.firstChild).toBeNull();
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

  it('renders light version when slug exists and theme is light', () => {
    render(
      <DesignSystemProvider mode="light">
        <FeaturedImage slug="flash" />
      </DesignSystemProvider>,
    );

    const image = screen.getByAltText('Flash');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('/jpg/flash/flash-og-light.jpg');
  });

  it('renders dark version when slug exists and theme is dark', () => {
    render(
      <DesignSystemProvider mode="dark">
        <FeaturedImage slug="flash" />
      </DesignSystemProvider>,
    );

    const image = screen.getByAltText('Flash');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('/jpg/flash/flash-og-dark.jpg');
  });

  it('resolves slug from image.src when a non-URL path slug string is passed', () => {
    render(
      <DesignSystemProvider mode="light">
        <FeaturedImage image={{ src: 'flash' }} />
      </DesignSystemProvider>,
    );

    const image = screen.getByAltText('Flash');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('/jpg/flash/flash-og-light.jpg');
  });
});
