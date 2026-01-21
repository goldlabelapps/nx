import { initialStateDesignSystem } from '../DesignSystem';
import { initialStateImages } from '../Images';
import { initialStatePaywall } from '../Paywall';
import { initialStateCommerce } from '../Commerce';
import { initialStateShortcodes } from '../Shortcodes';

export const initialState: any = {
  commerce: initialStateCommerce,
  designSystem: initialStateDesignSystem,
  images: initialStateImages,
  paywall: initialStatePaywall,
  shortcodes: initialStateShortcodes,
};