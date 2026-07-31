import * as React from 'react';
import { render } from '@testing-library/react';
import ChromeIcon from '@/app/NX/DesignSystem/components/SVGIcons/ChromeIcon';

describe('ChromeIcon smoke test', () => {
  it('loads without crashing', () => {
    const { container } = render(<ChromeIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
