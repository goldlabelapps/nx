export { DesignSystemProvider } from './components/DesignSystemProvider';
export { AppShell, PageSection, SectionTitle } from './components/Primitives';
export { createAppTheme, type DesignSystemMode } from './theme';

import './styles/globals.css';

// Allow CJS consumers to require the package (bundlers will use ESM by default)
// No runtime code needed; exports above are the public surface.
