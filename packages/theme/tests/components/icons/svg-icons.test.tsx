import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from '../../../src/design-system/components/icons';
import BlokeyIcon from '../../../src/design-system/components/icons/SVGIcons/BlokeyIcon';
import ChromeIcon from '../../../src/design-system/components/icons/SVGIcons/ChromeIcon';
import DesktopIcon from '../../../src/design-system/components/icons/SVGIcons/DesktopIcon';
import EdgeIcon from '../../../src/design-system/components/icons/SVGIcons/EdgeIcon';
import FallmanagerIcon from '../../../src/design-system/components/icons/SVGIcons/FallmanagerIcon';
import FirefoxIcon from '../../../src/design-system/components/icons/SVGIcons/FirefoxIcon';
import FlickrIcon from '../../../src/design-system/components/icons/SVGIcons/FlickrIcon';
import GatsbyIcon from '../../../src/design-system/components/icons/SVGIcons/GatsbyIcon';
import GoldenticketIcon from '../../../src/design-system/components/icons/SVGIcons/GoldenticketIcon';
import GoldlabelOutlined from '../../../src/design-system/components/icons/SVGIcons/GoldlabelOutlined';
import GraphqlIcon from '../../../src/design-system/components/icons/SVGIcons/GraphqlIcon';
import IphoneIcon from '../../../src/design-system/components/icons/SVGIcons/IphoneIcon';
import LinuxIcon from '../../../src/design-system/components/icons/SVGIcons/LinuxIcon';
import MacIcon from '../../../src/design-system/components/icons/SVGIcons/MacIcon';
import MacromediaIcon from '../../../src/design-system/components/icons/SVGIcons/MacromediaIcon';
import OliverIcon from '../../../src/design-system/components/icons/SVGIcons/OliverIcon';
import OpenAIIcon from '../../../src/design-system/components/icons/SVGIcons/OpenAIIcon';
import PingpongballIcon from '../../../src/design-system/components/icons/SVGIcons/PingpongballIcon';
import SafariIcon from '../../../src/design-system/components/icons/SVGIcons/SafariIcon';
import WindowsIcon from '../../../src/design-system/components/icons/SVGIcons/WindowsIcon';
import WordpressIcon from '../../../src/design-system/components/icons/SVGIcons/WordpressIcon';
import XboxIcon from '../../../src/design-system/components/icons/SVGIcons/XboxIcon';

describe('svg icon components', () => {
  it('exports Icon from icon barrel and renders known and unknown names', () => {
    const known = render(<Icon icon="wordpress" />);
    expect(known.container.querySelector('svg')).toBeTruthy();

    const unknown = render(<Icon icon={'__unknown__'} />);
    expect(unknown.container.querySelector('svg')).toBeTruthy();
  });

  it('renders every standalone SVG icon component', () => {
    const icons = [
      BlokeyIcon,
      ChromeIcon,
      DesktopIcon,
      EdgeIcon,
      FallmanagerIcon,
      FirefoxIcon,
      FlickrIcon,
      GatsbyIcon,
      GoldenticketIcon,
      GoldlabelOutlined,
      GraphqlIcon,
      IphoneIcon,
      LinuxIcon,
      MacIcon,
      MacromediaIcon,
      OliverIcon,
      OpenAIIcon,
      PingpongballIcon,
      SafariIcon,
      WindowsIcon,
      WordpressIcon,
      XboxIcon,
    ];

    for (const SvgComp of icons) {
      const { container, unmount } = render(<SvgComp />);
      expect(container.querySelector('svg')).toBeTruthy();
      unmount();
    }
  });
});
