import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoutedSiteNav from '../../../app/NX/DesignSystem/RoutedSiteNav';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('RoutedSiteNav', () => {
  beforeEach(() => {
    push.mockClear();
  });

  it('pushes the clicked route through the Next router', async () => {
    const user = userEvent.setup();

    render(
      <RoutedSiteNav
        items={[
          { title: 'Home', slug: '/' },
          { title: 'Features', path: '/features' },
        ]}
      />,
    );

    await user.click(screen.getByText('Features'));

    expect(push).toHaveBeenCalledWith('/features');
  });
});