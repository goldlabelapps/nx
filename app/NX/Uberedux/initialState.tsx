import { initialStateDesignSystem } from '../DesignSystem';
// import { initialStateImages } from '../Images';
// import { initialStatePaywall } from '../Paywall';
// import { initialStateCommerce } from '../Commerce';
// import { initialStateShortcodes } from '../Shortcodes';


export function getInitialState(config: any) {
  return {
    designSystem: typeof initialStateDesignSystem === 'function'
      ? initialStateDesignSystem(config)
      : initialStateDesignSystem,
    // commerce: initialStateCommerce,
    // images: initialStateImages,
    // paywall: initialStatePaywall,
    // shortcodes: initialStateShortcodes,
  };
}